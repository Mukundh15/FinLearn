import React,{useState,useEffect,useCallback} from "react";
import axios from "axios";
import {Grid,Card,CardContent,Typography,TextField,Button,Table,TableHead,TableRow,TableCell,TableBody,Box,CircularProgress,Snackbar,Alert,} from "@mui/material";
import { debounce } from "lodash";

function VirtualTrade(){
  const [amount,setAmount]=useState(0);
  const [loading,setLoading]=useState(true);
  const [stocks,setStocks]=useState([]);
  const [portfolio,setPortfolio]=useState([]);
  const [buyQuantity,setBuyQuantity]=useState({});
  const [sellQuantity,setSellQuantity]=useState({});
  const [error,setError]=useState(null);
  const [success,setSuccess]=useState(null);
  const debouncedSetBuyQuantity=useCallback(
    debounce((symbol, value)=>{
      setBuyQuantity((prev)=>({ ...prev, [symbol]: value }));
    }, 300),
    []
  );

  const debouncedSetSellQuantity = useCallback(
    debounce((symbol, value) => {
      setSellQuantity((prev) => ({ ...prev, [symbol]: value }));
    }, 300),
    []
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userRes, stocksRes] = await Promise.all([
          axios.get("http://localhost:8080/profile", { withCredentials: true }),
          axios.get(
            `https://api.twelvedata.com/price?symbol=TCS.NS,INFY.NS,RELIANCE.NS,HDFCBANK.NS,ICICIBANK.NS,LARSEN.NS,WIPRO.NS,AXISBANK.NS,ITC.NS,SBIN.NS&apikey=${process.env.REACT_APP_TWELVE_DATA_API_KEY}`
          ),
        ]);

        setAmount(userRes.data.user.amount);
        const result = Object.entries(stocksRes.data)
          .filter(([_, data]) => data.price)
          .map(([symbol, data]) => ({
            symbol,
            price: parseFloat(data.price),
            lastUpdated: new Date(),
          }));
        setStocks(result);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);
  const savePortfolio = async (updatedPortfolio) => {
    try {
      await axios.post(
        "http://localhost:8080/portfolio",
        { portfolio: updatedPortfolio, amount },
        { withCredentials: true }
      );
    } catch (err) {
      setError("Failed to save portfolio.");
      console.error("Error saving portfolio:", err);
    }
  };

  const handleBuy=(stock)=>{
    const qty=parseInt(buyQuantity[stock.symbol] || 0);
    const cost=qty*stock.price;
    if (qty <= 0||isNaN(qty)) {
      setError("Please enter a valid quantity");
      return;
    }
    if(cost>amount){
      setError("Insufficient funds");
      return;
    }

    setAmount((prev)=>prev-cost);
    setPortfolio((prev)=>{
      const existing=prev.find((p)=>p.symbol===stock.symbol);
      const updatedPortfolio=existing?prev.map((p)=>p.symbol=== stock.symbol
              ? { ...p, quantity: p.quantity + qty, total: (p.quantity + qty) * stock.price }
              : p
          )
        : [...prev, { symbol: stock.symbol, quantity: qty, total: cost }];

      savePortfolio(updatedPortfolio);
      return updatedPortfolio;
    });

    setBuyQuantity((prev) => ({ ...prev, [stock.symbol]: "" }));
    setSuccess(`Successfully bought ${qty} shares of ${stock.symbol}`);
  };

  const handleSell = (stock) => {
    const qty = parseInt(sellQuantity[stock.symbol] || 0);
    const portfolioItem = portfolio.find((p) => p.symbol === stock.symbol);

    if (!portfolioItem) {
      setError("You don't own this stock");
      return;
    }
    if (qty <= 0 || isNaN(qty)) {
      setError("Please enter a valid quantity");
      return;
    }
    if (qty > portfolioItem.quantity) {
      setError("Cannot sell more shares than you own");
      return;
    }

    const revenue=qty*stock.price;
    setAmount((prev)=>prev+revenue);
    setPortfolio((prev) => {
      const updatedPortfolio = prev
        .map((p) =>
          p.symbol === stock.symbol
            ? { ...p, quantity: p.quantity - qty, total: (p.quantity - qty) * stock.price }
            : p
        )
        .filter((p) => p.quantity > 0);

      savePortfolio(updatedPortfolio);
      return updatedPortfolio;
    });

    setSellQuantity((prev) => ({ ...prev, [stock.symbol]: "" }));
    setSuccess(`Successfully sold ${qty} shares of ${stock.symbol}`);
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccess(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
        Virtual Trading Dashboard
      </Typography>

      <Card
        sx={{
          textAlign: "center",
          mb: 4,
          p: 3,
          borderRadius: 3,
          boxShadow: 3,
          background: "linear-gradient(45deg, #f3f4f6 30%, #e5e7eb 90%)",
        }}
      >
        <Typography variant="h6">Available Virtual Amount</Typography>
        <Typography variant="h3" color="success.main">
          ₹{amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </Typography>
      </Card>

      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Market
      </Typography>
      <Grid container spacing={3}>
        {stocks.map((stock) => (
          <Grid item xs={12} sm={6} md={4} key={stock.symbol}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6">{stock.symbol}</Typography>
                <Typography variant="h5" color="primary.main">
                  ₹{stock.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Last updated: {new Date(stock.lastUpdated).toLocaleTimeString()}
                </Typography>
                <TextField
                  type="number"
                  label="Buy Quantity"
                  variant="outlined"
                  size="small"
                  value={buyQuantity[stock.symbol] || ""}
                  onChange={(e) => debouncedSetBuyQuantity(stock.symbol, e.target.value)}
                  sx={{ mt: 2, mb: 1, width: "100%" }}
                  inputProps={{ min: 0 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleBuy(stock)}
                  sx={{ mb: 1, width: "100%" }}
                >
                  Buy
                </Button>
                <TextField
                  type="number"
                  label="Sell Quantity"
                  variant="outlined"
                  size="small"
                  value={sellQuantity[stock.symbol] || ""}
                  onChange={(e) => debouncedSetSellQuantity(stock.symbol, e.target.value)}
                  sx={{ mt: 1, mb: 1, width: "100%" }}
                  inputProps={{ min: 0 }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleSell(stock)}
                  sx={{ width: "100%" }}
                >
                  Sell
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ mt: 5, mb: 3 }}>
        Portfolio
      </Typography>
      {portfolio.length === 0 ? (
        <Typography color="text.secondary">No stocks purchased yet.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Invested (₹)</TableCell>
              <TableCell>Current Value (₹)</TableCell>
              <TableCell>Profit/Loss (₹)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {portfolio.map((item) => {
              const currentStock = stocks.find((s) => s.symbol === item.symbol);
              const currentValue = currentStock ? item.quantity * currentStock.price : 0;
              const profitLoss = currentValue - item.total;
              return (
                <TableRow key={item.symbol}>
                  <TableCell>{item.symbol}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell>{currentValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell sx={{ color: profitLoss >= 0 ? "success.main" : "error.main" }}>
                    {profitLoss.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={!!success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default VirtualTrade;