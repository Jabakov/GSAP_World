import React from 'react';
import { navLinks } from '../../constants/index.js';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    useGSAP(() => {
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: 'nav',
                start: 'bottom top',
            }
        });

        navTween.fromTo('nav', { backgroundColor: 'transparent' }, {
            backgroundColor: '#00000050', 
            backgroundFilter: 'blur(10px)',
            duration: 1,
            ease: 'power1.inOut'
            });
    })
    
    return (
        <nav>
            <div>
                <Link to="/" className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCameraRetro} size="2x" />
                    <p>Ana's Pics</p>
                </Link>

                <ul>
                    {navLinks.map((link) => (
                       <li key={link.id}>
                            <Link to={`/${link.id === 'home' ? '' : link.id}`}>
                                {link.title}
                            </Link>
                       </li> 
                    ))}
                </ul>
            </div>
        </nav>
    )
}
export default Navbar