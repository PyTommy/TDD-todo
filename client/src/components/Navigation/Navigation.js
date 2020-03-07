import React from 'react'
import PropTypes from 'prop-types'
import classes from './Navigation.module.scss';
import NavigationItem from '../NavigationItem/NavigationItem';

const Navigation = props => {
    const navigationClass = ["nav justify-content-end", classes.Navigation];

    return (
        <ul className={navigationClass.join(" ")}>
            <NavigationItem to="/home">Home</NavigationItem>
            <NavigationItem to="/list">List</NavigationItem>
            <NavigationItem to="/mypage">MyPage</NavigationItem>
        </ul>
    )
}

Navigation.propTypes = {

}

export default Navigation;