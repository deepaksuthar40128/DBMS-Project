import "./profile.scss";
import PlaceIcon from "@mui/icons-material/Place";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import { useState } from "react";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (key) => {
      return makeRequest.post("/auth/addKey", key);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["auth"]);
      },
    }
  );

  const addKey = async () => {
    var challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);

    var options = {
      publicKey: {
        rp: {
          name: "Help"
        },
        user: {
          id: new Uint8Array([1, 2, 3, 4]),
          name: currentUser.username,
          displayName: currentUser.name
        },
        challenge: challenge,
        pubKeyCredParams: [{
          type: "public-key",
          alg: -7
        }],
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          requireResidentKey: false,
          userVerification: 'required'
        },
        timeout: 60000,
        attestation: 'none'
      }
    };

    navigator.credentials.create(options).then(async (credential) => {
      let key = credential.id;
      try {
        mutation.mutate({ key });
      } catch (err) {
        console.log(err);
      }

    }).catch(function (error) {
      let err = new Error(error.message.split('.')[0])
      console.log(err);
    });
  }

  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <img src={data.coverPic ? data.coverPic : '/imgs/dummy-bg.jpg'} alt="" className="cover" />
            <img src={data.profilePic ?  data.profilePic : '/imgs/dummy-avatar.jpg'} alt="" className="profilePic" />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="center">
                <span>{data.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{data.city ? data.city : "City"}</span>
                  </div>
                  <div className="item">
                    <EmailOutlinedIcon />
                    <span>{data.website ? data.website : "Email"}</span>
                  </div>
                </div>
                {userId === currentUser.id && (
                    <div>
                      <button onClick={() => setOpenUpdate(true)}>update</button>
                      {window.PublicKeyCredential && <button onClick={addKey}>Add Public Key</button>}
                    </div>
                )}
              </div>
            </div>
            <Posts url={`/posts/user/${userId}`} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
