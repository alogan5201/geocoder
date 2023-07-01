import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Box from "components/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TableContainer from "@mui/material/TableContainer";
import { useTheme } from "@mui/material/styles";
import Typography from "components/Typography";
import Table from "examples/Tables/Table";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
// Material Kit 2 PRO React Examples
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
const bull = (
  <Box component="span" sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}>
    •
  </Box>
);
function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Typography sx={{ mb: 1.5 }} color="secondary">
            Atlanta, GA
          </Typography>
          <img
            className="bookmark-image"
            src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Atlanta_Montage_2.jpg"
          ></img>
    
        </Stack>
      </CardContent>
    </Card>
  );
}

function MediaControlCard() {
  const theme = useTheme();

  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://upload.wikimedia.org/wikipedia/commons/5/5f/Atlanta_Montage_2.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
}

function DirectionStack() {
  return (
    <div>
      <Stack direction="row" spacing={2}>
       <Typography variant="body2" color="text"> Atlanta </Typography>

      </Stack>
    </div>
  )
}

function BookmarkTable() {
  const [rowData,setRowData] = useState([])
  const [bookmarkState, setBookmarkState] = useState(localStorage.getItem("bookmarks") || []);
   const [value, setValue, remove] = useLocalStorage("bookmarks");
useEffect(() => {
window.addEventListener("storage", () => {
  setBookmarkState(localStorage.getItem("bookmarks") || []);
  

});
}, []);

useEffect(() => {
  if(bookmarkState && bookmarkState.length > 0){
    let bookmarks = JSON.parse(bookmarkState)
        if (bookmarks && bookmarks.length > 0) {
          const bookmarkData = [];
          for (let i = 0; i < bookmarks.length; i++) {
            let obj = {};
            const address = bookmarks[i].title.includes(", United States")
              ? bookmarks[i].title.replace(", United States", "")
              : bookmarks[i].title;
            const latitude = bookmarks[i].lat;
            const longitude = bookmarks[i].lng;
            const dms = bookmarks[i].dms;
            const id = bookmarks[i].id;
            obj.address = address;
            obj.latitude = latitude;
            obj.longitude = longitude;
            obj.dms = dms;
            obj.id = id;
            (obj.action = (
              <IconButton aria-label="delete">
                <img
                  className="bookmark-image"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Atlanta_Montage_2.jpg"
                ></img>
              </IconButton>
            )),
              bookmarkData.push(obj);
          }

          setRowData(bookmarkData);
        }
  }
}, [bookmarkState]);




  const { columns, rows } = {
    columns: [
      { name: "address", align: "left" },
      { name: "action", align: "right" },
    ],

 
  };

  return (
    <Grid container item xs={12} lg={12} mx="auto">
      

      <TableContainer sx={{ maxHeight: 440, overflowX: "hidden" }}>
        <Table columns={columns} rows={rowData} aria-label="sticky table" hideColumns={[0,1]} hideColumnRow={true} />
      </TableContainer>
      <div style={{ fontSize: "14px", marginTop: "4em" }}>
        {/* <ReactJson src={bookmarkState || {id: 'foo'}} /> */}
      </div>
    </Grid>
  );
}

export default BookmarkTable;
