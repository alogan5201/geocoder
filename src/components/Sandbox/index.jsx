import { useEffect } from "react";
import ReactJson from "react-json-view";
import useStore from "store/mapStore";
import CitiesFirebase from "./CitiesFirebase";
import MovieFilmImport from './MovieFilmImport';
import BlogCard from 'components/BlogCard';
import Grid from '@mui/material/Grid';

function Sandbox() {
  const allObjects = useStore((state) => state);
  const testData = useStore((state) => state.testData);
  const weather = {
    origin: {
      address: "Atlanta",
      icon: "assets/images/weather/01.png",
      temp: 71.89,
    },
    destination: {
      address: "Austin",
      icon: "assets/images/weather/03.png",
      temp: 76.84,
    },
  };
  useEffect(() => {}, [allObjects]);
  return (
    <div>
      {/*       <Stack direction="row" spacing={15}>
        <div style={{ maxWidth: 120 }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ rotate: 180, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >

          <WeatherCard content={weather} />
          </motion.div>
        </div>
        <div style={{ maxWidth: 120 }}>
          <WeatherCard loading={true} />
        </div>
      </Stack>
         <div style={{ fontSize: "14px" }}>
        <ReactJson src={allObjects} />
      </div>
      <AutoCompleteAddress />



       */}
      <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <BlogCard
              maxWidth={400}
              maxHeight={400}
              image="https://firebasestorage.googleapis.com/v0/b/geotools-bc75a.appspot.com/o/images%2Fmovie-images%2Fthe_shawshank_redemption.jpg?alt=media&token=ab517d5d-e727-4809-bbb3-391e1c9ab08d"
              category={{ color: 'warning', label: 'hub' }}
              title="Shared Coworking"
              description="Use border utilities to quickly style the border and border-radius of an element. Great for images, buttons."
              author={{
                image: 'https://bit.ly/3pZfIPh',
                name: 'Mathew Glock',
                date: 'Posted on 28 February',
              }}
              action={{
                type: 'internal',
                route: '/somewhere',
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container direction="row" justifyContent="center" alignItems="center" spacing={0} mb={5}>
        <Grid item sx={{ px: { xs: 0, md: 7 } }}>
          <Grid container justifyContent="center" space={1}>
            <Grid item>
              <BlogCard
                maxWidth={400}
                maxHeight={400}
                image="https://firebasestorage.googleapis.com/v0/b/geotools-bc75a.appspot.com/o/images%2Fmovie-images%2Fthe_shawshank_redemption.jpg?alt=media&token=ab517d5d-e727-4809-bbb3-391e1c9ab08d"
                category={{ color: 'warning', label: 'hub' }}
                title="Shared Coworking"
                description="Use border utilities to quickly style the border and border-radius of an element. Great for images, buttons."
                author={{
                  image: 'https://bit.ly/3pZfIPh',
                  name: 'Mathew Glock',
                  date: 'Posted on 28 February',
                }}
                action={{
                  type: 'internal',
                  route: '/somewhere',
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ px: { xs: 0, md: 7 } }}>
          <BlogCard
            maxWidth={400}
            maxHeight={400}
            image="https://firebasestorage.googleapis.com/v0/b/geotools-bc75a.appspot.com/o/images%2Fmovie-images%2F12_angry_men.jpg?alt=media&token=eb4e0830-e856-40a8-9a34-f5e485b9a1cb"
            category={{ color: 'warning', label: 'hub' }}
            title="Shared Coworking"
            description="Use border utilities to quickly style the border and border-radius of an element. Great for images, buttons."
            author={{
              image: 'https://bit.ly/3pZfIPh',
              name: 'Mathew Glock',
              date: 'Posted on 28 February',
            }}
            action={{
              type: 'internal',
              route: '/somewhere',
            }}
          />
        </Grid>
      </Grid>

      {/*     
         <div style={{ fontSize: '14px', marginTop:"5em" }}>
        <ReactJson src={allObjects} />
      </div>
      <Wrapper
        children={<WhatChanged data={testData ? testData : null} />}
        name="What Changed"
      />
   
      <Controls /> */}
    </div>
  );
}
export default Sandbox;
