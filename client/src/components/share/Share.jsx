import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const [tagVisible, setTagVisible] = useState(false);
  const [pincode, setPincode] = useState(0);
  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();

    mutation.mutate({ desc, img: imgUrl, tags: finalTag, pincode });
    setDesc("");
    setFile(null);
  };

  const [finalTag, setfinalTag] = useState('');
  let b1 = true;
  const classRemover = (className, tag) => {
    Array.from(document.getElementsByClassName(className)).forEach(ele => {
      if (ele !== tag) {
        if (ele.classList.contains('selected')) ele.classList.remove('selected');
      }
    })
  }
  useEffect(() => {
    if (tagVisible) {
      Array.from(document.getElementsByClassName('tag')).forEach(tag => {
        tag.addEventListener('click', (e) => {
          classRemover('tag', tag);
          if (Array.from(tag.classList).includes('selected')) {
            tag.classList.remove('selected');
            setfinalTag('');
          }
          else {
            tag.classList.add('selected');
            setfinalTag(tag.innerHTML);
          }
        })
      })
    }
  }, [tagVisible])
  const [locationVisible, setLocationVisible] = useState(false);

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={currentUser.profilePic? currentUser.profilePic:'/imgs/dummy-avatar.jpg'} alt="" />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        {tagVisible && <div className="tags_container">
          <div className="tags">
            <div className="tag">Outdoor</div>
            <div className="tag">Indoor</div>
            <div className="tag">Old-Age</div>
            <div className="tag">Money</div>
            <div className="tag">Used-Things</div>
            <div className="tag">Donation</div>
            <div className="tag">Paid</div>
            <div className="tag">Urgent</div>
            <div className="tag">Child-Care</div>
            <div className="tag">Women</div>
          </div>
        </div>}
        {
          locationVisible &&
          <div className="location">
            <input onChange={(e) => setPincode(e.target.value)} type="number" name="pincode" id="pincode" placeholder="Enter Pincode" />
          </div>
        }
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span onClick={() => setLocationVisible(!locationVisible)} >Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span onClick={() => setTagVisible(!tagVisible)}>Tags</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
