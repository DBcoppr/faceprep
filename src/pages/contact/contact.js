import React, { useEffect, useState } from 'react'
import "./contact.css"
import { getData } from '../../util/api'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
function Contact() {
  const [users, setUser] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true);
  const scrollcontainer=document.querySelector(".contact-list")
  var inz = "#"
  useEffect(() => {
    (async () => {
      const data = await getData(page);
      setUser((prev)=>[...prev, ...data]);
      setLoading(false);
      scrollcontainer
      .addEventListener("scroll", handelInfiniteScroll);
          return () => {window.removeEventListener("scroll", handelInfiniteScroll);
    }
    })();

  }, [page]);

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + scrollcontainer.scrollTop + 1 >=
        scrollcontainer.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlelogout = () => {
    localStorage.clear();
    window.location.reload()
  }

  const handlechange = (e) => {
    const searchInput = e.target.value;
    if (searchInput.length > 0) {
      const result = users.filter((val) => {
        return val.fullname.toLowerCase().includes(searchInput.toLowerCase());
      });
      var inz = "#"
      setUser(result);
      console.log(result)
    } else {
      var inz = "#"
      setUser(users);
    }
  }
  if (!loading) {
    return (
      <main class="contact-pg">
        <div class="login-container">
          <header class="c-header">
            <h2>Contacts</h2>
            <button class="logout" onClick={() => handlelogout()}>logout</button>
          </header>
          <div className="search-bar">
            <input type="text" className='search-box' placeholder='search..' onChange={(e) => handlechange(e)} />
          </div>
          <div class="contact-list">
            {
              users.map((item, index) => (
                <div class="user-container" key={index}>
                  {item.fullname[0] === inz ?
                    <div class="user">
                      <img src={item.picture} alt="" />
                      <h3 class="user-name">{item.fullname || <Skeleton />}</h3>
                    </div> :
                    <div class="user-initial">
                      <h1>{inz = item.fullname[0]}</h1>
                      <div class="user">
                        <img src={item.picture} alt="" />
                        <h3 class="user-name">{item.fullname || <Skeleton />}</h3>
                      </div>
                    </div>
                  }
                </div>
              ))
            }
          </div>
        </div>
      </main>
    )
  }
  else {
    return (
      <main class="contact-pg">
        ...LOADING
      </main>
    )
  }

}

export default Contact