import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {Grid,Card,CardContent,Typography,CircularProgress,Box,TextField,Snackbar,Alert,} from "@mui/material";
import { debounce } from "lodash";
import { Bar } from "react-chartjs-2";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Stocksdata() {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const symbols = [
    "TCS.NS",
    "INFY.NS",
    "RELIANCE.NS",
    "HDFCBANK.NS",
    "ICICIBANK.NS",
    "LARSEN.NS",
    "WIPRO.NS",
    "AXISBANK.NS",
    "ITC.NS",
    "SBIN.NS",
  ];

  const fetchPrices = useCallback(async () => {
    try {
      setLoading(true);
      const requests = symbols.map((symbol) =>
        axios.get(
          `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${process.env.REACT_APP_TWELVE_DATA_API_KEY}`
        )
      );

      const responses = await Promise.all(requests);

      const stockPrices = responses.map((res, index) => ({
        symbol: symbols[index],
        price: parseFloat(res.data.price).toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        lastUpdated: new Date(),
      }));

      setStocks(stockPrices);
      setFilteredStocks(stockPrices);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch stock prices. Please try again later.");
      console.error("Error fetching stock data:", err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  const handleSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
      const filtered = stocks.filter((stock) =>
        stock.symbol.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStocks(filtered);
    }, 300),
    [stocks]
  );

  const handleCloseSnackbar=()=>{
    setError(null);
  };

  const stockPriceChart={
    data: {
      labels: filteredStocks.map((stock) => stock.symbol),
      datasets: [
        {
          label: "Stock Prices (₹)",
          data: filteredStocks.map((stock) => parseFloat(stock.price.replace(/,/g, ""))),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: "Price (₹)",
          },
        },
        x: {
          title: {
            display: `true`,
            text: "Stock Symbol",
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: (context) =>
              `₹${context.raw.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
          },
        },
      },
    },
  };

  if (loading) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" mt={10}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading stock prices...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4, fontWeight: "bold" }}>
        Latest Stock Prices
      </Typography>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
        <TextField
          label="Search Stocks"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          sx={{ width: { xs: "100%", sm: "50%", md: "30%" } }}
          placeholder="Enter stock symbol..."
          inputProps={{ "aria-label": "Search stocks by symbol" }}
        />
      </Box>
      <Box sx={{ mb: 4, p: 2, backgroundColor: "#f5f5f5", borderRadius: 2, height: 400 }}>
        <Typography variant="h6" gutterBottom>
          Stock Price Overview
        </Typography>
        <Bar data={stockPriceChart.data} options={stockPriceChart.options} />
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {filteredStocks.length === 0 ? (
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            No stocks match your search.
          </Typography>
        ) : (
          filteredStocks.map((stock) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={stock.symbol}>
              <Card
                elevation={6}
                sx={{
                  minWidth: 200,
                  borderRadius: 3,
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" gutterBottom>
                    {stock.symbol}
                  </Typography>
                  <Typography variant="h5" color="primary.main">
                    ₹{stock.price}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Last updated: {stock.lastUpdated.toLocaleTimeString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Stocksdata;