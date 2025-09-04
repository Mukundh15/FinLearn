import React, { useState } from "react";

function BasicsModule() {
  const [score, setScore] = useState(null);

  const questions = [
    {
      q: "Why should you invest money instead of only saving?",
      options: [
        "Because saving always beats inflation",
        "Because investing helps your money grow faster than inflation",
        "Because banks force you to invest",
      ],
      answer: 1,
    },
    {
      q: "Which of these is the safest investment?",
      options: ["Stocks", "Mutual Funds", "Fixed Deposits"],
      answer: 2,
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
    <div className="container mt-5 mb-5">
        <h1 className="mb-4">📘 Basics of Investing</h1>
        <p>
        Investing is the process of putting your money into financial instruments, assets, or ventures with the expectation of generating a profit over time. Unlike saving, which mainly focuses on keeping money safe and accessible, investing aims to grow your wealth by earning returns that often exceed inflation. By investing wisely, individuals can build a secure financial future, achieve long-term goals, and create a source of passive income.
        </p>

        <p>
        There are various types of investment options available, each with different levels of risk and potential returns. Stocks, for example, represent ownership in a company and offer the potential for capital appreciation and dividends. Mutual funds pool money from multiple investors to invest in a diversified portfolio of stocks, bonds, or other assets, providing professional management and risk diversification. Bonds are debt instruments where investors lend money to corporations or governments in exchange for fixed interest payments over a specified period. Understanding these options is crucial for selecting investments that match your financial goals and risk tolerance.
        </p>

        <p>
        One of the fundamental concepts in investing is the trade-off between risk and reward. Generally, higher potential returns come with higher risk, while safer investments typically offer lower returns. It is essential for investors to assess their risk appetite and create a balanced portfolio that aligns with their long-term objectives. Diversification, or spreading investments across different assets and sectors, helps reduce risk by minimizing the impact of underperforming investments.
        </p>

        <p>
        Another critical aspect is understanding the power of compounding. Compounding occurs when the returns generated from an investment are reinvested to generate additional earnings. Over time, compounding can significantly increase the value of your investments, making early and consistent investing highly beneficial. For example, investing a small amount regularly in a well-performing mutual fund can grow substantially over decades due to compounding effects.
        </p>

        <p>
        Before investing, it is important to define clear financial goals, whether it is buying a home, funding education, or planning for retirement. Goals help determine the investment horizon, amount to invest, and type of instruments to choose. Short-term goals may require safer, liquid investments, while long-term goals allow investors to take calculated risks with higher-return instruments like equities. Proper financial planning and discipline are essential for achieving investment objectives.
        </p>

        <p>
        Knowledge and education are critical for successful investing. Investors should learn how markets work, analyze financial statements, track economic indicators, and understand the fundamentals of different asset classes. With the rise of digital platforms, online resources, courses, and simulators provide practical ways to learn and practice investing without risking real money.
        </p>

        <p>
        In summary, investing is a powerful tool to grow wealth, beat inflation, and achieve financial goals. By understanding different types of investments, balancing risk and reward, leveraging the power of compounding, setting clear goals, and continuously educating oneself, individuals can become confident and successful investors. Starting early and being consistent are key strategies that can help anyone build a strong financial foundation for the future.
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

export default BasicsModule;
