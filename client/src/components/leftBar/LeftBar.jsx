import "./leftBar.scss";
import { AuthContext } from "../../context/authContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LeftBar = ({ changeURL }) => {
  const { currentUser } = useContext(AuthContext);
  let b1 = true;
  const classRemover = (className, tag) => {
    Array.from(document.getElementsByClassName(className)).forEach(ele => {
      if (ele !== tag) {
        if (ele.classList.contains('selected')) ele.classList.remove('selected');
      }
    })
  }
  const [finalTag, setfinalTag] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (document.getElementsByClassName('tag2') && b1) {
      b1 = false;
      Array.from(document.getElementsByClassName('tag2')).forEach(tag => {
        // console.log(tag)
        tag.addEventListener('click', () => {
          classRemover('tag2', tag);
          //console.log(Array.from(tag.classList).includes('selected'))
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
  }, []);
  const [pincode, setPincode] = useState(0);
  useEffect(() => {
    let baseURL = '/posts';
    if (finalTag !== '' || pincode !== 0) baseURL += '?'
    if (finalTag !== '') baseURL += `tag=${finalTag}`;
    if (finalTag !== '' && pincode !== 0) baseURL += '&';
    if (pincode !== 0) baseURL += `pincode=${pincode}`;
    changeURL(baseURL);
  }, [finalTag])
  useEffect(() => {
    let baseURL = '/posts';
    if (finalTag !== '' || pincode !== 0) baseURL += '?'
    if (finalTag !== '') baseURL += `tag=${finalTag}`;
    if (finalTag !== '' && pincode !== 0) baseURL += '&';
    if (pincode !== 0) baseURL += `pincode=${pincode}`;
    changeURL(baseURL);
  }, [pincode])

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={currentUser.profilePic?currentUser.profilePic:'/imgs/dummy-avatar.jpg'}
              alt=""
            />
            <span>{currentUser.name}</span>
          </div>
          <div className="main_left_box">
            <h3>Show Feed By Tags:</h3>
            <div className="tags_container">
              <div className="tags">
                <div className="tag2">Outdoor</div>
                <div className="tag2">Indoor</div>
                <div className="tag2">Old-Age</div>
                <div className="tag2">Money</div>
                <div className="tag2">Used-Things</div>
                <div className="tag2">Donation</div>
                <div className="tag2">Paid</div>
                <div className="tag2">Urgent</div>
                <div className="tag2">Child-Care</div>
                <div className="tag2">Women</div>
              </div>
            </div>
            <h3>Show Feed By Location: </h3>
            <div className="tags_container">
              <input type="number" name="pinSearch" id="pinSearch" placeholder="Enter Pincode" />
              <button className="btn" onClick={() => {
                setPincode(document.getElementById('pinSearch').value)
              }}>Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
