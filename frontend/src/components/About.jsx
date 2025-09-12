import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Home } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen from-base-300 to-base-200 max-w-7xl w-full">
      <nav className="navbar bg-base-100 shadow-lg px-4">
        <div className="flex-1 gap-2 container items-center flex flex-row">
          <Link to={"/"} className="flex items-center gap-2  text-primary">
            <Home className="w-10 h-10" />
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <h2 className="pl-3  text-lg font-semibold">About Section</h2>
        </div>
      </nav>

      <div className=" bg-base-50 flex flex-col items-center  p-10">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold z-10 mb-2">
            About <span className="text-primary">LeetLab</span>
          </h1>
          <img src="/leetlab.svg" className="h-34 w-34 mx-auto" />
          <p className="text-gray-400 text-lg leading-relaxed">
            LeetLab is a <b>beginner-friendly</b> coding platform inspired by
            LeetCode, designed to help developers prepare for technical
            interviews with <b>interactive coding challenges</b>.
          </p>

          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <div className="card bg-primary/20 shadow-md p-5 rounded-lg">
              <h2 className="text-xl font-semibold">🚀 Beginner Friendly</h2>
              <p className="text-gray-400 p-1.5">
                Practice problems with detailed explanations.
              </p>
            </div>
            <div className="card bg-primary/20 shadow-md p-5 rounded-lg">
              <h2 className="text-xl font-semibold">🎯 Problem Solving</h2>
              <p className="text-gray-400 p-1.5">
                Sharpen your coding skills with structured challenges.
              </p>
            </div>
            <div className="card bg-primary/20 shadow-md p-5 rounded-lg">
              <h2 className="text-xl font-semibold ">💡 Community Learning</h2>
              <p className="text-gray-400 p-1.5">
                Engage with discussions & shared solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;