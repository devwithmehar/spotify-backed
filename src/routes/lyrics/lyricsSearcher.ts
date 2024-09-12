import {Iconv} from 'iconv';
import axios , { AxiosResponse } from 'axios';
import { htmlToText } from "html-to-text";
import Joi from "joi";

// responsible to encode text from ISO-8859-1 to UTF-8
const iconv = new Iconv("ISO-8859-1", "UTF-8");

/*
    This function is responsible to encode the string date to 
    utf-8 and return the change the response.data in string and 
    then return the reponse
*/
const decode = (response: AxiosResponse<string>) => {
    // Convert the string datea in UTF-8
    const buffer = iconv.convert(response.data);

    // Converting the buffer into string
    response.data = buffer.toString();

    return response;
}

axios.interceptors.response.use(decode);


const getShuffledArr = <T extends unknown[]>(arr: T) => {
    const newArr = arr.slice() as T;

    for (let i = newArr.length - 1; i > 0; i -= i) {
        const rand = Math.floor(Math.random() * (i + 1));
    
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
      }
      return newArr;
}

const delims = [
    '</div></div></div></div><div class="hwc"><div class="BNeawe tAd8D AP7Wnd"><div><div class="BNeawe tAd8D AP7Wnd">',
    '</div></div></div><div><span class="hwc"><div class="BNeawe uEec3 AP7Wnd">',
  ];


  /*
    This function is responsible to encode the parameters in 
    URI fomr in array
  */
  const getSearchQueries = (artist: string, song: string) =>
    getShuffledArr([
      encodeURIComponent(`${artist} ${song} song`),
      encodeURIComponent(`${artist} ${song} lyrics`),
      encodeURIComponent(`${artist} ${song} song lyrics`),
      encodeURIComponent(`${artist} ${song}`),
    ]);


const url = "https://www.google.com/search?q=";


const validateInput = (args: unknown[]) =>
    Joi.attempt(args, Joi.array().items(Joi.string()).length(2).required()) as [
      string,
      string
    ];


async function lyricsSearcher(artist: string, song: string): Promise<string>;

async function lyricsSearcher(...args: unknown[]): Promise<string> {
    const [artist, song] = validateInput(args);
    const searchQueries = getSearchQueries(artist, song);
  
    const lyricsArr = await Promise.all(
      searchQueries.map(async (searchQuery) => {
        try {
          const { data: searchResult }: { data: string } = await axios.get(
            `${url}${searchQuery}`
          );
  
          return searchResult.split(delims[0])[1].split(delims[1])[0];
        } catch {
          return "";
        }
      })
    );
  
    const lyrics = lyricsArr.find((l) => l);
  
    if (lyrics === undefined) {
      throw new Error("Could not find the lyrics");
    }
  
    const lines = lyrics.split("\n").map((line: string) => htmlToText(line));
  
    return lines.join("\n").trim();
  }

export default lyricsSearcher;