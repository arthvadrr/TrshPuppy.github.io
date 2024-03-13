import initialState from "../initialState";
import reducer from "../reducer";
import { useReducer } from "react"
//Link SVGs
import HackTheBoxSVG from "./svg/HackTheBox";
import TryHackMeSVG from "./svg/TryHackMe";
import CodeWarsSVG from "./svg/CodeWars";
import TwitterSVG from "./svg/Twitter";
import YouTubeSVG from "./svg/YouTube";
import GitHubSVG from "./svg/GitHub";
import TwitchSVG from "./svg/Twitch";


const SocialsOld = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const linkColors = {
        hackthebox: '#d3ee98',
        tryhackme: '#ffeb81',
        codewars: '#F05656',
        youtube: '#F50003',
        twitter: '#2C96E8',
        github: '#E6EDF3',
        twitch: '#A960FF'
    };

    const textColors = {
        hackthebox: '#2A3909',
        tryhackme: '#2E2700',
        codewars: '#FFFFFF',
        youtube: '#FFFFFF',
        twitter: '#FFFFFF',
        github: '#000000',
        twitch: '#FFFFFF'
    };

    const updateHoveredLinkName = e => {
        const dataName = e.target.getAttribute('data-name');
        const dataColor = e.target.getAttribute('data-color');
        const textColor = e.target.getAttribute('data-text-color');

        if (dataName) {
          dispatch({
            type: 'UPDATE_HOVERED_LINK_NAME',
            payload: dataName,
          });
        }

        if (dataColor) {
            dispatch({
                type: 'UPDATE_HOVERED_LINK_COLOR',
                payload: dataColor,
            });
        }

        if (textColor) {
            dispatch({
                type: 'UPDATE_HOVERED_TEXT_COLOR',
                payload: textColor
            })
        }
      };

    const resetLink = () => {
        dispatch({ type: 'UPDATE_HOVERED_LINK_NAME', payload: '' });
        dispatch({ type: 'UPDATE_HOVERED_LINK_COLOR', payload: '' });
    }

    return (
        <section className="socials">
        <div role="region" id="linkInfo" aria-live="polite">
            <samp 
                id="hoveredLinkName"
                className={state.hoveredLinkName ? "active" : ""}
                style={{
                    backgroundColor: state.hoveredLinkColor,
                    filter: `drop-shadow(0 0 2px ${state.hoveredLinkColor})`,
                    color: state.hoveredTextColor
                }}
            >{state.hoveredLinkName}</samp>
        </div>
        <ul 
            className="external-links"
            onMouseLeave={() => resetLink()}
        >
            <li key="link-github">
                <a 
                    className="link github" 
                    data-name="GitHub"
                    style={{color: linkColors.github}}
                    data-color={linkColors.github}
                    data-text-color={textColors.github}
                    onMouseEnter={e => updateHoveredLinkName(e)}
                    href="https://github.com/TrshPuppy"
                    target="_blank"
                    rel="noreferrer"
                >
                    <GitHubSVG />
                    <div>Github</div>
                </a>
            </li>
            <li key="link-twitch">
                <a 
                    className="link twitch" 
                    data-name="Twitch"
                    style={{color: linkColors.twitch}}
                    data-color={linkColors.twitch}
                    data-text-color={textColors.twitch}
                    onMouseEnter={e => updateHoveredLinkName(e)}
                    href="https://www.twitch.tv/trshpuppy"
                    target="_blank"
                    rel="noreferrer"
                >
                    <TwitchSVG />
                    <div>Twitch</div>
                </a>
            </li>
            <li key="link-youtube">
                <a 
                    className="link youtube" 
                    data-name="YouTube"
                    style={{color: linkColors.youtube}}
                    data-color={linkColors.youtube}
                    data-text-color={textColors.youtube}
                    onMouseEnter={e => updateHoveredLinkName(e)}
                    href="https://youtube.com/@TrshPuppy"
                    target="_blank"
                    rel="noreferrer"
                >
                    <YouTubeSVG />
                    <div>Youtube</div>
                </a>
            </li>
            <li key="link-twitter">
                <a 
                    className="link twitter" 
                    data-name="Twitter"
                    style={{color: linkColors.twitter}}
                    data-text-color={textColors.twitter}
                    data-color={linkColors.twitter}
                    onMouseEnter={e => updateHoveredLinkName(e)}
                    href="https://twitter.com/trshpuppy"
                    target="_blank"
                    rel="noreferrer"
                >
                    <TwitterSVG />
                    <div>Twitter</div>
                </a>
            </li>
            <li key="link-codewars">
                <a 
                    className="link codewars" 
                    data-name="CodeWars"
                    style={{color: linkColors.codewars}}
                    data-color={linkColors.codewars}
                    data-text-color={textColors.codewars}
                    onMouseEnter={e => updateHoveredLinkName(e)}
                    href="https://www.codewars.com/users/TrshPuppy"
                    target="_blank"
                    rel="noreferrer"
                >
                    <CodeWarsSVG />
                    <div>CodeWars</div>
                </a>
            </li>
            <li key="link-tryhackme">
                <a 
                    className="link tryhackme" 
                    data-name="TryHackMe"
                    style={{color: linkColors.tryhackme}}
                    data-color={linkColors.tryhackme}
                    data-text-color={textColors.tryhackme}
                    onMouseEnter={e => updateHoveredLinkName(e)}
                    href="https://tryhackme.com/p/TrshPuppy"
                    target="_blank"
                    rel="noreferrer"
                >
                    <TryHackMeSVG />
                    <div>TryHackMe</div>
                </a>
            </li>
            <li key="link-hackthebox">
                <a 
                    className="link hackthebox" 
                    data-name="HackTheBox"
                    style={{color: linkColors.hackthebox}}
                    data-color={linkColors.hackthebox}
                    data-text-color={textColors.hackthebox}
                    onMouseEnter={e => updateHoveredLinkName(e)}
                    href="https://app.hackthebox.com/profile/1343592"
                    target="_blank"
                    rel="noreferrer"
                >
                    <HackTheBoxSVG />
                    <div>HackTheBox</div>
                </a>
            </li>
        </ul>
    </section>
    )
}

export default SocialsOld;