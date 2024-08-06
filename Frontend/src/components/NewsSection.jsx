import React, { useEffect, useState } from "react";
import axios from "axios";

const OpenNews = ({ onClose, id }) => {
  const [newsData, setNewsData] = useState({});
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/news/news/${id}`)
      .then((response) => {
        console.log("News data by id fetched");
        setNewsData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the news data!", error);
      });
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:4000/api/v1/news/${id}/comments`, { comment })
      .then((response) => {
        console.log("Comment added");
        setComment(""); // Clear the input field
        setNewsData((prevState) => ({
          ...prevState,
          newsComments: [...prevState.newsComments, response.data],
        }));
      })
      .catch((error) => {
        console.error("There was an error adding the comment!", error);
      });
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 bg-black flex justify-center items-center z-50">
      <div className="relative bg-[#121212] w-[90%] h-[90%] text-white rounded-lg p-4 flex gap-3">
        <div className="w-[45%] h-full">
          <img className="w-full h-full overflow-hidden " src={newsData.newsImage} alt="News" />
        </div>
        <div className="w-[55%] h-full flex flex-col gap-1">
          <div className="w-full h-[10%] font-gtaDescriptionText text-2xl font-bold">
            {newsData.newsHeading}
          </div>
          <div className="w-full h-[25%] font-gtaDescriptionText text-xl mt-4">
            {newsData.newsDescription}
          </div>
          <div className="w-full h-full border-gray-500 border-2">
            {newsData.newsComments?.map((comment, index) => (
              <p key={index}>{comment.text}</p>
            ))}
          </div>
          <div className="w-full h-[10%] bg-red-950 border-gray-500 border-2"></div>
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 rounded"
              placeholder="Add a comment..."
            />
            {/* <button
              type="submit"
              className="mt-2 bg-blue-500 p-2 rounded text-white"
            >
              Add Comment
            </button> */}
          </form>
        </div>
        <button
          className="absolute top-2 right-2 text-2xl text-white bg-[#c21f1f] rounded-full px-2"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </div>
  );
};

const NewsSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNewsId, setSelectedNewsId] = useState(null);
  const [data, setData] = useState([]);

  const handleOpenNews = (id) => {
    setSelectedNewsId(id);
    setIsOpen(true);
  };

  const handleCloseNews = () => {
    setIsOpen(false);
    setSelectedNewsId(null);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/news/news")
      .then((response) => {
        console.log("New data fetched successfully");
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error getting news data!", error);
      });
  }, []);

  return (
    <>
      {isOpen && <OpenNews onClose={handleCloseNews} id={selectedNewsId} />}
      <section className="w-screen h-screen overflow-x-hidden">
        <div className="relative bg-blackish w-screen h-full overflow-y-hidden">
          <div className='mt-[8vh] bg-[url("/newsSection.png")] w-full h-full bg-contain bg-center bg-no-repeat'>
            <p className="text-whitish font-gtaHeadingText1 absolute top-[8vh] left-[5vh] text-[3rem]">
              Lspd News Barrier
            </p>
          </div>
          <div className="flex gap-[1.4em] bg-white py-[0.em] absolute bottom-[3em] 0 w-screen -rotate-[3deg]">
            <AimationCards data={data} />
          </div>
        </div>
        <div className="w-screen flex gap-[15px] p-[15px]">
          <div className="w-[65%] flex flex-col gap-[15px]">
            <div className="w-[100%] h-[40rem]">
              {data.length > 0 && (
                <NewsGridCardCarousel
                  data={data[0]}
                  onClick={() => handleOpenNews(data[0]._id)}
                />
              )}
            </div>
            <div className="w-[100%] flex gap-[15px] h-[21rem]">
              {data.slice(1, 4).map((news) => (
                <NewsGridCard1
                  key={news._id}
                  news={news}
                  onClick={() => handleOpenNews(news._id)}
                />
              ))}
            </div>
            <div className="w-full flex justify-center gap-[15px] h-[20em]">
              {data.slice(4, 6).map((news) => (
                <NewsGridCard2
                  key={news._id}
                  news={news}
                  onClick={() => handleOpenNews(news._id)}
                />
              ))}
            </div>
          </div>
          <div
            id="newsSectionSideBar"
            className="w-[35%] h-[83rem] p-[10px] rounded-[1.4em] flex flex-col gap-[15px] overflow-x-scroll"
          >
            <NewsSideBar news={data.slice(6)} onClick={handleOpenNews} />
          </div>
        </div>
      </section>
    </>
  );
};

const NewsGridCard1 = ({ onClick, news }) => {
  return (
    <article
      onClick={onClick}
      className="font-gtaDescriptionText w-[24em] h-[21em] relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-3 pb-6 pt-40 max-w-sm mx-auto cursor-pointer"
    >
      <img
        src={news.newsImage}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
      <h3 className="z-10 mt-3 text-2xl font-bold text-white">
        {news.newsHeading}
      </h3>
      {/* <div className="z-10 mt-2 gap-y-1 overflow-x-hidden text-sm leading-6 text-gray-300">
        {news.newsDescription}
      </div> */}
    </article>
  );
};

const NewsGridCard2 = ({ onClick, news }) => {
  return (
    <article
      onClick={onClick}
      className="font-gtaDescriptionText w-[50%] h-[21em] relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-3 pb-6 pt-40 cursor-pointer"
    >
      <img
        src={news.newsImage}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
      <h3 className="z-10 mt-3 text-2xl font-bold text-white">
        {news.newsHeading}
      </h3>
      {/* <div className="z-10 mt-2 gap-y-1 overflow-x-hidden text-sm leading-6 text-gray-300">
      {news.newsDescription}
      </div> */}
    </article>
  );
};

const NewsGridCardCarousel = ({ onClick, data }) => {
  return (
    <div className="w-full h-full bg-dblue rounded-[1.2em]">
      <article
        onClick={onClick}
        className="font-gtaDescriptionText overflow-auto w-full h-full relative isolate flex flex-col justify-end  rounded-[1.2em] px-5 pb-10 pt-40 cursor-pointer"
      >
        <img
          src={data.newsImage}
          className="absolute inset-0 h-full w-full object-cover overflow-hidden"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
        <h2 className="z-10 mt-3 text-5xl font-bold text-white">
          {data.newsHeading}
        </h2>
        <div className="z-10 mt-5 ml-[3px] gap-y-1 overflow-x-hidden text-md leading-6 text-gray-300">
          {data.newsDescription}
        </div>
      </article>
    </div>
  );
};

const NewsSideBarCard = ({ onClick, news }) => {
  return (
    <div
      className="w-full h-[10em] bg-white shadow-xl rounded-[1.2em] p-[10px] cursor-pointer"
      onClick={onClick}
    >
      <article className="font-gtaDescriptionText  w-full h-full relative isolate flex justify-between  rounded-[1.2em]  ">
        <div className="w-[20%] overflow-hidden">
          <img
            src={news.newsImage}
            className="rounded-[0.8em] absolute inset-0 h-full w-[8.5rem] object-cover overflow-hidden"
          />
        </div>
        <div className="w-[70%] h-full overflow-hidden">
          <h2 className="mt-3 text-xl font-bold text-blackish">
            {news.newsHeading}
          </h2>
          <div className="mt-5 ml-[3px] gap-y-1 overflow-hidden text-md leading-6 text-blackish">
            {news.newsDescription}
          </div>
        </div>
      </article>
    </div>
  );
};

const NewsSideBar = ({ onClick, news }) => {
  return (
    <>
      {news.map((data) => (
        <NewsSideBarCard
          key={data._id}
          news={data}
          onClick={() => onClick(data._id)}
        />
      ))}
    </>
  );
};

const AimationCards = ({data}) => {
  return (
    <>
      <section class="animationSection">
        <div class="scroll">
          {/* <!-- First set of images --> */}
          {data.map((news) => (
            <div>
              <img className="h-full w-full" src={news.newsImage}></img>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default NewsSection;
