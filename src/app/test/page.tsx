'use client'
import { Shelf } from "../_components/shelf";
import { useState } from "react";
export type Movie = {
    title: string;
    overview: string;
    vote_average: number;
    poster_path: string;
}
 const TestPage = () => {
    const [movie, setMovie] = useState<Movie[]>([])
    const movieData = async () => {
        try {
            fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1")
        } catch(error) {
            console.log(error);
        }
    }
  return (
    <>
     <Shelf></Shelf>
    </>
  );
};
export default TestPage
