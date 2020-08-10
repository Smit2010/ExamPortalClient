import React from 'react'
import "../../Style/Header.css"
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NotificationsIcon from '@material-ui/icons/Notifications';
import RestorePageIcon from '@material-ui/icons/RestorePage';

function Header(props) {
    return (
        <div className="header">
            {/* Logo */}
            <div className="header__leftSide">
                <MenuIcon className="header__menu" onClick={() => props.show(!props.curr_vis)}/>
                <img src="https://lh3.googleusercontent.com/proxy/gw_CDhNLKwmGx-0Cv8g2JclcIRndM5FNGO72xkyS01cel5ftTPQ3sSQP-2YPVhYAl5r6Z6FMFuxZdsKYAK2yA9UNGoqYx2g" className="header__logo"/>
            </div>
            
            {/* Search box */}
            <div className="header__search">
                <TextField variant="outlined" placeholder="Search" className="header__input" />
                <Button className="header__serachIcon" variant="outlined">
                    <SearchIcon />
                </Button>
            </div>
            
            {/* Right side logo */}
            <div className="header__rightSide">
                <NotificationsIcon className="header__iconHeight"/>
                <RestorePageIcon className="header__iconHeight"/>
                <div className="header__profile header__iconHeight">
                    <img src="https://lh4.googleusercontent.com/-rpFOFHO38kE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclAh3Z-IEdsIMjPkAvVwoMMG1-roA/s88-c-k-c0x00ffffff-no-rj-mo/photo.jpg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Header
