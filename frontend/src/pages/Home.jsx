import React from 'react';
import { Link } from "react-router-dom";
import Chatbot from '../pages/Chatbot'; // import your Chatbot component

function Home(){
    const scrollToSection = () => {
        const section = document.getElementById("learn-section");
        if(section){
          section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="container mt-5 mb-5">
            {/* Hero section */}
            <div className="row align-items-center">
                <div className="col">
                    <h1 style={{fontSize:'50px'}}>FinLearn-Financial Learning</h1>
                    <p style={{fontSize:'20px'}}>
                        Empowering Indian retail investors with financial literacy, interactive education, and virtual trading in their preferred language.
                    </p>
                    <button className="btn btn-primary" onClick={scrollToSection}>Start Learning</button>
                </div>
                <div className="col-6">
                    <img src="meetingimage.jpg" width='90%' style={{borderRadius:'30px'}}/>
                </div>
            </div>

            {/* Features section */}
            <div className="row mt-5">
                <h1 style={{fontSize:'40px',textAlign:'center'}}>Features</h1>
                <p style={{fontSize:'20px',textAlign:'center'}}>
                    Comprehensive financial education platform designed specifically for Indian retail investors
                </p>
                <div className="row mt-4">
                    {/* Feature cards */}
                    <div className="col-md-4">
                        <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                            <div className="card-body text-center">
                                <h5 className="card-title">📈 Virtual Trading</h5>
                                <p className="card-text">Practice real-world stock trading with virtual money to build confidence without risk.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                            <div className="card-body text-center">
                                <h5 className="card-title">📚 Learning Modules</h5>
                                <p className="card-text">Interactive courses on investing, stock markets, and financial literacy.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                            <div className="card-body text-center">
                                <h5 className="card-title">🌐 Multi-Language Support</h5>
                                <p className="card-text">Learn in your preferred Indian language for better accessibility.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modules section */}
            <div id="learn-section" className="mt-5">
                <h1 style={{ fontSize: '40px', textAlign: 'center' }}>Start Learning</h1>
                <p style={{ fontSize: '18px', textAlign: 'center' }}>
                    Choose a module below to begin your financial literacy journey 🚀
                </p>

                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="card shadow p-3 mb-5 bg-white rounded text-center">
                            <h5 className="card-title">📘 Basics of Investing</h5>
                            <p className="card-text">Understand savings, inflation, and why investing matters.</p>
                            <Link to="/basics" className="btn btn-primary">Start Module</Link>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow p-3 mb-5 bg-white rounded text-center">
                            <h5 className="card-title">📊 Stock Market</h5>
                            <p className="card-text">Learn how the stock market works with beginner-friendly examples.</p>
                            <Link to="/stocks" className="btn btn-primary">Start Module</Link>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow p-3 mb-5 bg-white rounded text-center">
                            <h5 className="card-title">🎯 Virtual Trading</h5>
                            <p className="card-text">Practice real-world stock trading with zero financial risk.</p>
                            <Link to="/VirtualTrade" className="btn btn-primary">Start Practice</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12">
                    <Chatbot />
                </div>
            </div>
            <div id="why-this-matters" style={{padding: "60px 20px",backgroundColor: "#f9f9f9",textAlign: "center" ,marginTop:'2rem'}}>
                <h2 style={{fontSize: "2.5rem",color: "#1a202c",marginBottom: "20px"}}>Why This Matters</h2>
                <p style={{maxWidth: "800px",margin: "0 auto",fontSize: "1.1rem",lineHeight: "1.6",color: "#4a5568"}}>
                    Millions of retail investors in India struggle with understanding basic financial concepts, leading to poor investment decisions and reliance on unverified advice. 
                    Many educational resources are available only in English, making it difficult for non-English speakers to learn effectively. 
                    Our platform bridges this gap by providing <strong>interactive tutorials, quizzes, and visual simulations in multiple regional languages</strong>. 
                    By learning in a simple, engaging, and safe environment, users can <strong>build financial confidence, make informed decisions, and develop good money management habits</strong>.
                </p>
            </div>
        </div>
    )
}

export default Home;
