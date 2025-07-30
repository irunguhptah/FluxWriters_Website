import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, Users, Quote, Award } from 'lucide-react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WriterProfileBox = ({ title, text, tag, author, isOnline, action, image, rating }) => {
  const stars = Array(5).fill(0).map((_, i) => (
    <Star 
      key={i} 
      className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
    />
  ));

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-blue-200 transform hover:-translate-y-1 group">
      {/* Header with gradient and profile image */}
<div className="h-28 bg-gradient-to-br from-green-300 to-blue-300 relative">
  <div className="absolute -bottom-10 left-6">
    <div
      className="h-20 w-20 rounded-full border-4 border-white bg-white shadow-md relative transform group-hover:scale-110 transition-transform"
      style={{ overflow: 'visible' }} // IMPORTANT: allow dot overflow
    >
      <img src={image} alt={title} className="h-full w-full object-cover rounded-full" />
      <span
        className={`absolute -top-0 -right-0 h-4 w-4 rounded-full border-2 border-white ${
          isOnline ? 'bg-green-500' : 'bg-red-500'
        } shadow-lg z-[9999]`}
        title={isOnline ? 'Online' : 'Offline'}
      ></span>
    </div>
  </div>
</div>

      
      {/* Content */}
      <div className="pt-12 px-6 pb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{title}</h3>
          <div className="flex flex-col items-end">
            <span className="text-xl font-bold text-blue-600">{rating}.0/5</span>
            <span className="flex items-center">{stars}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 min-h-[40px]">{text}</p>
        
        <div className="flex justify-between items-center">
          <div>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${isOnline ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
              <span className={`h-2 w-2 rounded-full mr-1 ${isOnline ? "bg-green-500" : "bg-gray-500"}`}></span>
              {author}
            </span>
          </div>
          
          <button 
            onClick={action}
            className="px-4 py-1 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all hover:scale-105"
          >
            {tag}
          </button>
        </div>
      </div>
    </div>
  );
};

const TestimonialSlider = () => {
  const testimonials = [
    {
      text: "The quality of the paper exceeded my expectations. It was well-researched, perfectly formatted, and delivered ahead of schedule.",
      name: "Sarah J.",
      role: "Graduate Student"
    },
    {
      text: "FluxWriters helped me through a challenging semester. The writer understood my requirements perfectly and delivered outstanding work.",
      name: "Michael T.",
      role: "Undergraduate Student"
    },
    {
      text: "I'm impressed by the depth of knowledge and attention to detail. My assignment received high praise from my professor.",
      name: "Jennifer L.",
      role: "PhD Candidate"
    },
    {
      text: "Fast, reliable, and top-notch quality. I will definitely use FluxWriters again for my future assignments.",
      name: "David K.",
      role: "MBA Student"
    },
    {
      text: "The support team was very responsive and helpful. The writer delivered exactly what I needed.",
      name: "Emily R.",
      role: "Law Student"
    },
    {
      text: "Great experience! The paper was original and well-written. Highly recommend their services.",
      name: "Chris P.",
      role: "Engineering Student"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ],
    nextArrow: (
      <button className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    ),
    prevArrow: (
      <button className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
    ),
  };

  return (
    <div className="relative py-10 px-4 sm:px-0">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-4xl h-full bg-gradient-to-r from-blue-50 via-green-50 to-purple-50 rounded-3xl opacity-30"></div>
      </div>
      <div className="relative z-10">
        <Slider {...settings}>
          {testimonials.map((t, idx) => (
            <div key={idx} className="px-2">
              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100 flex flex-col items-center h-full min-h-[260px] transform transition-all hover:scale-[1.02] hover:shadow-xl">
                <Quote className="text-blue-200 h-10 w-10 mb-2" />
                <div className="mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="inline h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6 text-center">"{t.text}"</p>
                <div className="flex items-center justify-center mt-auto">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-300 to-blue-300 flex items-center justify-center text-white font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div className="ml-3 text-left">
                    <p className="font-semibold text-gray-800">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default function Blog() {
  const [showMore, setShowMore] = useState(false);

  const blogData = [
    {
      id: 1,
      title: "Prof. Stanley",
      text: "Business & Management, Marketing, Economics",
      tag: "Hire",
      author: "238 Orders Completed",
      isOnline: false,
      image: "/assets/images/profile.png",
      rating: 1,
    },
    {
      id: 2,
      title: "Prof. Emma",
      text: "Healthcare & Nursing",
      tag: "Hire",
      author: "238 Orders Completed",
      isOnline: false,
      image: "/assets/images/profile.png",
      rating: 2,
    },
    {
      id: 3,
      title: "Dr. Brian",
      text: "Engineering & Tech",
      tag: "Hire",
      author: "238 Orders Completed",
      isOnline: true,
      image: "/assets/images/profile.png",
      rating: 3,
    },
    {
      id: 4,
      title: "Prof. Linda",
      text: "Law & Criminal Justice",
      tag: "Hire",
      author: "238 Orders Completed",
      isOnline: true,
      image: "/assets/images/profile.png",
      rating: 4,
    },
    {
      id: 5,
      title: "Dr. Kate",
      text: "Psychology & Sociology",
      tag: "Hire",
      author: "238 Orders Completed",
      isOnline: false,
      image: "/assets/images/profile.png",
      rating: 5,
    },
    {
      id: 6,
      title: "Mr. Johnson",
      text: "Finance & Accounting",
      tag: "Hire",
      author: "238 Orders Completed",
      isOnline: true,
      image: "/assets/images/profile.png",
      rating: 3,
    },
  ];

  const blogsToShow = showMore ? blogData : blogData.slice(0, 4);

  return (
    <section id="writers" className="w-full relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-blue-100 opacity-20 blur-xl"></div>
        <div className="absolute bottom-1/4 left-20 w-32 h-32 rounded-full bg-green-100 opacity-20 blur-xl"></div>
      </div>

      <div className="bg-white py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 via-green-100 to-purple-100 px-6 py-2 rounded-full shadow-sm mb-6 border border-blue-200">
              <Award className="text-yellow-400 mr-2" size={18} />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Expert Writing Team
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Meet Our
              </span>{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Professional Writers
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-blue-100 opacity-60 rounded-full"></span>
              </span>
            </h1>

            <div className="max-w-2xl mx-auto">
              <p className="text-lg md:text-xl font-medium text-blue-700 bg-gradient-to-r from-blue-100 via-green-100 to-purple-100 rounded-xl px-6 py-3 shadow-sm border border-blue-200">
                <span className="inline-block mr-2">📝</span>
                Our writers hold advanced degrees and have years of experience
                <span className="inline-block ml-2">📚</span>
              </p>
            </div>
          </div>

          {/* Writers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {blogsToShow.map((blog) => (
              <WriterProfileBox
                key={blog.id}
                title={blog.title}
                text={blog.text}
                tag={blog.tag}
                author={blog.author}
                isOnline={blog.isOnline}
                action={() => alert(`Clicked ${blog.title}`)}
                image={blog.image}
                rating={blog.rating}
              />
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowMore(!showMore)}
              className="group relative px-10 py-3 overflow-hidden rounded-xl bg-gradient-to-r from-green-400 to-blue-400 text-white font-bold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {!showMore ? (
                  <>
                    Load More Writers <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
                  </>
                ) : (
                  <>
                    Show Less <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
                  </>
                )}
              </span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-100 py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Client
              </span>{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Testimonials
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-blue-100 opacity-60 rounded-full"></span>
              </span>
            </h1>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg md:text-xl font-medium text-blue-700 bg-gradient-to-r from-blue-100 via-green-100 to-purple-100 rounded-xl px-6 py-3 shadow-sm border border-blue-200">
                <span className="inline-block mr-2">⭐</span>
                Rated 4.9/5 by thousands of happy students
                <span className="inline-block ml-2">✨</span>
              </p>
            </div>
          </div>
          <TestimonialSlider />
        </div>
      </div>
    </section>
  );
}