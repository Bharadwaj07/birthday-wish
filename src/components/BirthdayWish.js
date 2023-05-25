import { React } from "react";
import "./BirthdayWish.css";
import { gsap, Expo, Elastic } from "gsap";
import { useEffect, useRef } from "react";
import userData from "../customize.json";

function BirthdayWish() {
  const data = userData;
  const app = useRef(null);
  const tl = useRef();
  useEffect(() => {
    let ctx = gsap.context(() => {
      const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
      const hbd = document.getElementsByClassName("wish-hbd")[0];

      textBoxChars.innerHTML = `<span>${data.textInChatBox
        .split("")
        .join("</span><span>")}</span>`;

      hbd.innerHTML = `<span>${data.wishHeading
        .split("")
        .join("</span><span>")}</span>`;
      const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg",
      };

      const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg",
      };
      tl.current = gsap
        .timeline()
        .to(".container", 0.1, {
          visibility: "visible",
        })
        .from(".one", 0.7, {
          opacity: 0,
          y: 10,
        })
        .from(".two", 0.4, {
          opacity: 0,
          y: 10,
        })
        .to(
          ".one",
          0.7,
          {
            opacity: 0,
            y: 10,
          },
          "+=2.5"
        )
        .to(
          ".two",
          0.7,
          {
            opacity: 0,
            y: 10,
          },
          "-=1"
        )
        .from(".three", 0.7, {
          opacity: 0,
          y: 10,
          // scale: 0.7
        })
        .to(
          ".three",
          0.7,
          {
            opacity: 0,
            y: 10,
          },
          "+=2"
        )
        .from(".four", 0.7, {
          scale: 0.2,
          opacity: 0,
        })
        .from(".fake-btn", 0.3, {
          scale: 0.2,
          opacity: 0,
        })
        .staggerTo(
          ".hbd-chatbox span",
          0.5,
          {
            visibility: "visible",
          },
          0.05
        )
        .to(".fake-btn", 0.1, {
          backgroundColor: "rgb(127, 206, 248)",
        })
        .to(
          ".four",
          0.5,
          {
            scale: 0.2,
            opacity: 0,
            y: -150,
          },
          "+=0.7"
        )
        .from(".idea-1", 0.7, ideaTextTrans)
        .to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")
        .from(".idea-2", 0.7, ideaTextTrans)
        .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")
        .from(".idea-3", 0.7, ideaTextTrans)
        .to(".idea-3 strong", 0.5, {
          scale: 1.2,
          x: 10,
          backgroundColor: "rgb(21, 161, 237)",
          color: "#fff",
        })
        .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
        .from(".idea-4", 0.7, ideaTextTrans)
        .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")
        .from(
          ".idea-5",
          0.7,
          {
            rotationX: 15,
            rotationZ: -10,
            skewY: "-5deg",
            y: 50,
            z: 10,
            opacity: 0,
          },
          "+=0.5"
        )
        .to(
          ".idea-5 .smiley",
          0.7,
          {
            rotation: 90,
            x: 8,
          },
          "+=0.4"
        )
        .to(
          ".idea-5",
          0.7,
          {
            scale: 0.2,
            opacity: 0,
          },
          "+=2"
        )
        .staggerFrom(
          ".idea-6 span",
          0.8,
          {
            scale: 3,
            opacity: 0,
            rotation: 15,
            ease: Expo.easeOut,
          },
          0.2
        )
        .staggerTo(
          ".idea-6 span",
          0.8,
          {
            scale: 3,
            opacity: 0,
            rotation: -15,
            ease: Expo.easeOut,
          },
          0.2,
          "+=1"
        )
        .staggerFromTo(
          ".baloons img",
          2.5,
          {
            opacity: 0.9,
            y: 1400,
          },
          {
            opacity: 1,
            y: -1000,
          },
          0.2
        )
        .from(
          ".girl-dp",
          0.5,
          {
            scale: 3.5,
            opacity: 0,
            x: 25,
            y: -25,
            rotationZ: -45,
          },
          "-=2"
        )
        .from(".hat", 0.5, {
          x: -100,
          y: 350,
          rotation: -180,
          opacity: 0,
        })
        .staggerFrom(
          ".wish-hbd span",
          0.7,
          {
            opacity: 0,
            y: -50,
            // scale: 0.3,
            rotation: 150,
            skewX: "30deg",
            ease: Elastic.easeOut.config(1, 0.5),
          },
          0.1
        )
        .staggerFromTo(
          ".wish-hbd span",
          0.7,
          {
            scale: 1.4,
            rotationY: 150,
          },
          {
            scale: 1,
            rotationY: 0,
            color: "#ff69b4",
            ease: Expo.easeOut,
          },
          0.1,
          "party"
        )
        .from(
          ".wish h5",
          0.5,
          {
            opacity: 0,
            y: 10,
            skewX: "-15deg",
          },
          "party"
        )
        .staggerTo(
          ".eight svg",
          1.5,
          {
            visibility: "visible",
            opacity: 0,
            scale: 80,
            repeat: 3,
            repeatDelay: 1.4,
          },
          0.3
        )
        .to(".six", 0.5, {
          opacity: 0,
          y: 30,
          zIndex: "-1",
        })
        .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
        .to(
          ".last-smile",
          0.5,
          {
            rotation: 90,
          },
          "+=1"
        );
    }, app);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div ref={app} style={{width:'100%',height:'100%'}}>
      <div className="container">
        <div className="one">
          <h1 className="one">
            <span data-node-name="greeting">{data.greeting}{" "}</span>
            <span data-node-name="name">{data.name}</span>
          </h1>
          <p className="two" data-node-name="greetingText">
            {data.greetingText}
          </p>
        </div>
        <div className="three">
          <p data-node-name="text1">{data.text1}</p>
        </div>
        <div className="four">
          <div className="text-box">
            <p className="hbd-chatbox" data-node-name="textInChatBox">
              {data.textInChatBox}
            </p>
            <p className="fake-btn" data-node-name="sendButtonLabel">
              {data.sendButtonLabel}
            </p>
          </div>
        </div>
        <div className="five">
          <p className="idea-1" data-node-name="text2">
            {data.text2}
          </p>
          <p className="idea-2" data-node-name="text3">
            {data.text3}
          </p>
          <p className="idea-3">
            <span data-node-name="text4">{data.text4}{" "}</span>
            <strong data-node-name="text4Adjective">
              {data.text4Adjective}
            </strong>
            .
          </p>
          <p className="idea-4" data-node-name="text5Entry">
            {data.text5Entry}
          </p>
          <p className="idea-5">
            <span data-node-name="text5Content">{data.text5Content}</span>
            <span className="smiley" data-node-name="smiley">
              {data.smiley}
            </span>
          </p>
          <p className="idea-6">
            <span data-node-name="bigTextPart1">{data.bigTextPart1}</span>
            <span data-node-name="bigTextPart2">{data.bigTextPart2}</span>
          </p>
        </div>
        <div className="six">
          <img
            src={data.imagePath}
            alt=""
            className="girl-dp"
            data-node-name="imagePath"
          />
          <img
            src={require("../assets/images/hat.png")}
            alt=""
            className="hat"
          />
          <div className="wish">
            <h3 className="wish-hbd" data-node-name="wishHeading">
              {data.wishHeading}
            </h3>
            <h5 data-node-name="wishText">{data.wishText} </h5>
          </div>
        </div>
        <div className="seven">
          <div className="baloons">
            <img src={require("../assets/images/ballon2.png")} alt="" />
            <img src={require("../assets/images/ballon1.png")} alt="" />
            <img src={require("../assets/images/ballon3.png")} alt="" />
            <img src={require("../assets/images/ballon1.png")} alt="" />
            <img src={require("../assets/images/ballon2.png")} alt="" />
            <img src={require("../assets/images/ballon3.png")} alt="" />
            <img src={require("../assets/images/ballon2.png")} alt="" />
            <img src={require("../assets/images/ballon3.png")} alt="" />
            <img src={require("../assets/images/ballon1.png")} alt="" />
            <img src={require("../assets/images/ballon2.png")} alt="" />
            <img src={require("../assets/images/ballon3.png")} alt="" />
            <img src={require("../assets/images/ballon2.png")} alt="" />
            <img src={require("../assets/images/ballon1.png")} alt="" />
            <img src={require("../assets/images/ballon3.png")} alt="" />
            <img src={require("../assets/images/ballon2.png")} alt="" />
            <img src={require("../assets/images/ballon3.png")} alt="" />
            <img src={require("../assets/images/ballon1.png")} alt="" />
            <img src={require("../assets/images/ballon2.png")} alt="" />
            <img src={require("../assets/images/ballon1.png")} alt="" />
            <img src={require("../assets/images/ballon3.png")} alt="" />
            <img src={require("../assets/images/ballon3.png")} alt="" />
            <img src={require("../assets/images/ballon1.png")} alt="" />
            <img src={require("../assets/images/ballon2.png")} alt="" />
            <img src={require("../assets/images/ballon3.png")} alt="" />
            <img src={require("../assets/images/ballon2.png")} alt="" />
            <img src={require("../assets/images/ballon1.png")} alt="" />
            <img src={require("../assets/images/ballon3.png")} alt="" />
            <img src={require("../assets/images/ballon2.png")} alt="" />
            <img src={require("../assets/images/ballon3.png")} alt="" />
            <img src={require("../assets/images/ballon1.png")} alt="" />
            <img src={require("../assets/images/ballon2.png")} alt="" />
            <img src={require("../assets/images/ballon1.png")} alt="" />
            <img src={require("../assets/images/ballon3.png")} alt="" />
          </div>
        </div>
        <div className="eight">
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" />
          </svg>
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" />
          </svg>
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" />
          </svg>
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" />
          </svg>
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" />
          </svg>
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" />
          </svg>
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" />
          </svg>
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" />
          </svg>
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" />
          </svg>
        </div>
        <div className="nine">
          <p data-node-name="outroText">{data.outroText}</p>
          <p id="replay" onClick={() => tl.current.restart()} data-node-name="replayText">
            {data.replayText}
          </p>
          <p className="last-smile" data-node-name="outroSmiley">
            {data.outroSmiley}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BirthdayWish;
