import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.scss"
import LeftBar from "../../components/leftBar/LeftBar"
import { useState } from "react"

const Home = () => {
  const [url, setURL] = useState('');
  const changeURL = (url) => {
    setURL(url);
  }
  return (
    <div className="main_home">
      <div className="left_home">
        <LeftBar changeURL={changeURL} />
      </div>
      <div className="home">
        <Share />
        {url !== '' && <Posts url={url} />}
      </div>
    </div>
  )
}

export default Home