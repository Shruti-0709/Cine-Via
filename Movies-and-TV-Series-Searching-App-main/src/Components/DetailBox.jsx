import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";
import { useState, useEffect } from 'react';
import YouTubeIcon from "@material-ui/icons/YouTube";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Gallery from "./Carousel"

import {
  img_300,
  unavailable,
} from "../Services/config"


const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "70%",
    height: "90%",
    backgroundColor: "#000000",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
  '@media (max-width: 600px)': {
    width: "90%",
    height: "90%",
  },
}));

export default function DetailBox({children, media_type, id}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState()
  const [video, setVideo] = useState()

  const fetchData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=80deb4bd2977bc9673a7427effed30de&language=en-US`
    );
    const data = await response.json();
    setContent(data)
  }

  const fetchVideoData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=80deb4bd2977bc9673a7427effed30de&language=en-US`
    );
    const data = await response.json();
    setVideo(data.results[0]?.key);
  }

  useEffect(() => {
    fetchData();
    fetchVideoData();
  }, []);

  return (
    <div>
      <div className="flex-col bg-[#ffff] hover:bg-[#3bb33d] hover:[text-shadow:_1px_2px_0_rgb(163_163_163/_100%)] w-56 rounded-xl px-2 pt-2 pb-1 pointer " onClick={handleOpen} color="inherit" >{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div className="flex flex-col justify-between h-full w-full overflow-y-auto scrollbar-none text-black gap-x-8 p-5 md:flex md:flex-row ">
                
                
                <div className="flex-row font-Cinzel w-[95%] h-[90%] justify-evenly text-center">
                  

                  <div>
                  <img
                    src={ content.poster_path ? `${img_300}/${content.poster_path}` : unavailable}
                    alt={content.name || content.title}
                    className="object-contain rounded-xl w-40 mx-auto "
                  />
  
                  <span className=" flex items-center justify-center text-4xl pt-5 pb-3 [text-shadow:_2px_2px_0_rgb(168_168_168/_100%)]">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>

                  {content.tagline && (
                    <i className="text-lg block [text-shadow:_2px_2px_0_rgb(168_168_168/_100%)]">{content.tagline}</i>
                  )}
                  </div>

                  <p className="p-5 mt-5 h-1/4 rounded-xl shadow-inner shadow-gray-800 text-justify overflow-y-auto scrollbar-none">
                    {content.overview}
                  </p>
                  <div className='flex text-2xl text-black [text-shadow:_2px_2px_0_rgb(168_168_168/_100%)] pt-5'>Cast Info.</div>
                  <hr class="h-px mt-1 mb-3 bg-gray-200 border-0 dark:bg-gray-700"/>
                  <div>
                    <Gallery media_type={media_type} id={id} className="w-1/2"/>
                  </div>
                  <div className='flex gap-x-3 justify-center mb-5'>
                    <Button
                      style={{margin_bottom:"10px", width: "215px"}}
                      variant="contained"
                      startIcon={<YouTubeIcon />}
                      color="secondary"
                      target="__blank"
                      href={`https://www.youtube.com/watch?v=${video}`}
                    >
                      Watch the Trailer
                    </Button>
                    {content.tagline && (
                      <Button
                      style={{margin_bottom:"10px", width: "215px"}}
                      variant="contained"
                      startIcon={<ShoppingCartOutlinedIcon />}
                      color="secondary"
                      target="__blank"
                      href={`${content.homepage}`}
                      >
                        Watch Now
                      </Button>
                    )}
                  </div>

                  <div className='flex text-2xl text-black [text-shadow:_2px_2px_0_rgb(168_168_168/_100%)]'>Other Info.</div>
                  <hr class="h-px mt-1 mb-3 bg-gray-200 border-0 dark:bg-gray-700"/>
                  
                  <div className="flex gap-x-4 flex-wrap justify-center ">
                    {content.vote_average && (
                      <p className="text-lg text-gray-700 [text-shadow:_2px_2px_0_rgb(168_168_168/_100%)]">Rating: <spam className="text-xl text-black ">{content.vote_average}</spam></p>
                    )}
                    {content.status && (
                      <p className="text-lg text-gray-700  [text-shadow:_2px_2px_0_rgb(168_168_168/_100%)]">Status: <spam className="text-xl text-black ">{content.status}</spam></p>
                    )}
                    {content.origin_country && (
                      <p className="text-lg text-gray-700  [text-shadow:_2px_2px_0_rgb(168_168_168/_100%)]">Origin Country: <spam className="text-xl text-black ">{content.origin_country}</spam></p>
                    )}
                    {content.original_language && (
                      <p className="text-lg text-gray-700  [text-shadow:_2px_2px_0_rgb(168_168_168/_100%)]">Original Language: <spam className="text-xl text-black ">{content.original_language}</spam></p>
                    )}
                    {content.runtime && (
                      <p className="text-lg text-gray-700  [text-shadow:_2px_2px_0_rgb(168_168_168/_100%)]">Runtime: <spam className="text-xl text-black ">{content.runtime}</spam> mins</p>
                    )}
                    {content.first_air_date  && (
                      <p className="text-lg text-gray-700  [text-shadow:_2px_2px_0_rgb(168_168_168/_100%)]">First Air Date: <spam className="text-xl text-black ">{content.first_air_date}</spam></p>
                    )}
                    {content.release_date  && (
                      <p className="text-lg text-gray-700  [text-shadow:_2px_2px_0_rgb(168_168_168/_100%)]">Release Date: <spam className="text-xl text-black ">{content.release_date}</spam></p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </div>
  );
}


