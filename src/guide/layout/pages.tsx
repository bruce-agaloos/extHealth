import * as React from "react";
import { useParams, Link } from "react-router-dom";

export default function Pages() {
  const { id } = useParams(); 
  const finalPage = "finalPage";
  const pages = [
    {
      id: 1,
      title: "Page 1",
      content: "Content of Page 1",
      nextLink: "pages/2",
      imgLink: "https://example.com/image1.png",
    },
    {
      id: 2,
      title: "Page 2",
      content: "Content of Page 2",
      nextLink: "pages/3",
      imgLink: "https://example.com/image2.png",
    },
    {
      id: 3,
      title: "Page 3",
      content: "Content of Page 3",
      nextLink: finalPage,
      imgLink: "https://example.com/image3.png",
    },
  ];

  const currentPage = pages.find(page => page.id === parseInt(id));

  // If no page is found, return an error or fallback UI
  if (!currentPage) {
    return <div>Page not found</div>;
  }

  return (
    <div id="pages">
      <h1>{currentPage.title}</h1>
      <p>{currentPage.content}</p>
      <img src={currentPage.imgLink} alt={currentPage.title} />

      {/* Use the nextLink for navigation */}
      <Link to={`/guide.html/${currentPage.nextLink}`}>Next Page</Link>
    </div>
  );
}