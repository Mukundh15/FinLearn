import React, { useState } from "react";

function StocksModule() {
  const [score, setScore] = useState(null);

  const questions = [
    {
      q: "What is a stock?",
      options: [
        "A loan you give to a company",
        "Ownership share in a company",
        "A type of bond",
      ],
      answer: 1,
    },
    {
      q: "What does Sensex represent?",
      options: [
        "Top 30 companies on BSE",
        "Top 50 companies on NSE",
        "Government bonds",
      ],
      answer: 0,
    },
  ];

  const checkAnswers = () => {
    let correct = 0;
    questions.forEach((ques, i) => {
      const selected = document.querySelector(`input[name=q${i}]:checked`);
      if (selected && parseInt(selected.value) === ques.answer) {
        correct++;
      }
    });
    setScore(`You scored ${correct} / ${questions.length}`);
  };

  return (
    <div className="container mt-5 mb-4">
        <h1>📊 Stock Market</h1>
        <p>
        The stock market is a marketplace where shares of publicly traded companies are bought and sold. It serves as a bridge between companies seeking capital and investors looking for opportunities to grow their wealth. By purchasing shares, investors become partial owners of a company and have the potential to earn profits through capital appreciation and dividends. The stock market is a cornerstone of the modern economy, enabling businesses to raise funds for expansion while allowing individuals to invest and participate in wealth creation.
        </p>

        <p>
        One of the key concepts in the stock market is understanding how stock prices are determined. Prices fluctuate based on supply and demand dynamics, company performance, economic indicators, and market sentiment. When a company performs well and generates higher earnings, the demand for its shares usually increases, leading to a rise in stock price. Conversely, negative news, economic downturns, or poor company performance can cause stock prices to decline. Investors often analyze financial statements, industry trends, and market conditions to make informed investment decisions.
        </p>

        <p>
        Another important aspect is the distinction between different types of stocks. Common stocks provide ownership rights and voting privileges, whereas preferred stocks offer fixed dividends and priority over common stockholders in case of company liquidation. Understanding the risk and reward associated with each type of stock is crucial for building a balanced investment portfolio. Diversification, or spreading investments across multiple stocks and sectors, helps manage risk and reduces the impact of any single investment underperforming.
        </p>

        <p>
        The stock market also operates through organized exchanges, such as the Bombay Stock Exchange (BSE) and the National Stock Exchange (NSE) in India. These exchanges provide a regulated environment for trading, ensuring transparency and fairness. Brokers and online trading platforms facilitate buying and selling of shares, making investing accessible to retail investors. Technology has revolutionized stock trading, enabling real-time access to market data, instant transactions, and advanced analysis tools.
        </p>

        <p>
        Beyond individual investing, the stock market plays a vital role in the broader economy. It allows companies to raise capital for research, innovation, and expansion, which in turn creates jobs and contributes to economic growth. Market indices like Sensex and Nifty track the performance of a group of stocks and serve as indicators of overall market health. Investors monitor these indices to gauge market trends and sentiment.
        </p>

        <p>
        While investing in the stock market can be highly rewarding, it also comes with risks. Market volatility, economic fluctuations, and unexpected events can impact stock prices. Therefore, it is important for investors to educate themselves, set realistic goals, and adopt strategies like long-term investing, diversification, and disciplined risk management. By understanding the fundamentals of the stock market and staying informed, investors can make confident decisions and work towards achieving financial independence.
        </p>

        <p>
        In summary, the stock market is not just a place for trading shares; it is a powerful financial ecosystem that connects investors with companies and drives economic growth. Learning how it works, the factors influencing stock prices, different types of investments, and risk management strategies is essential for anyone looking to participate in wealth creation. With the right knowledge and approach, investors can navigate the stock market successfully and harness its potential for long-term financial growth.
        </p>


      <h3 className="mt-4 text-center">Quiz</h3>
      {questions.map((ques, i) => (
        <div key={i} className="mb-3">
          <p>{ques.q}</p>
          {ques.options.map((opt, j) => (
            <div key={j}>
              <input type="radio" name={`q${i}`} value={j} /> {opt}
            </div>
          ))}
        </div>
      ))}
      <button className="btn btn-success" onClick={checkAnswers}>
        Submit Quiz
      </button>
      {score && <h4 className="mt-3">{score}</h4>}
    </div>
  );
}

export default StocksModule;
