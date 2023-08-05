import React from 'react'
import Footer from '../../../components/footer/Footer'
import './home.css'
import Unav from '../../../components/userNav/Unav'
import {BiCheck} from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Home = () => {
    const id = "1";
    return (
        <div>
            <main>
                <Unav />
                <div className="intro-txt">
                    <h2>welcone sddfsdf</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo tenetur, corporis velit laboriosam reprehenderit dolorem!</p>
                </div>
            </main>
            <section id='services'>
                <h2>services</h2>

                <div className="services__container">
                    <article className='services'>
                        <div className="service__head">
                            <h3>service title</h3>
                        </div>
                        <ul className="service__list">
                            <li>
                                <BiCheck className='service__list-icon' />
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                            </li>
                            <li className='bttn'>
                                <Link to={`/service/${"1"}`}>enroll</Link>
                            </li>
                        </ul>
                    </article>
                    <article className='services'>
                        <div className="service__head">
                            <h3>service title</h3>
                        </div>
                        <ul className="service__list">
                            <li>
                                <BiCheck className='service__list-icon' />
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                            </li>
                            <li className='bttn'>
                                <Link to={`/service/${"2"}`}>enroll</Link>
                            </li>
                        </ul>
                    </article>
                    <article className='services'>
                        <div className="service__head">
                            <h3>service title</h3>
                        </div>
                        <ul className="service__list">
                            <li>
                                <BiCheck className='service__list-icon' />
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                            </li>
                            <li className='bttn'>
                                <Link to={`/service/${id}`}>enroll</Link>
                            </li>
                            
                        </ul>
                        
                    </article>
                    <Link className=''>show more</Link>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Home