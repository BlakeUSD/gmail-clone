import React, { useState, useEffect } from 'react'
import "./EmailList.css"
import { IconButton } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import SettingsIcon from '@mui/icons-material/Settings';
import Section from './Section';
import InboxIcon from '@mui/icons-material/Inbox';
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EmailRow from './EmailRow';
import { db } from "./firebase";

function EmailList() {

    const [emails, setEmails] = useState([]);

    useEffect(() => {
        db.collection('emails').orderBy('timestamp', 'desc').onSnapshot(snapshot =>
            setEmails(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );
    }, [])

    return (
        <div className='emailList'>
            <div className="emailList__settings">
                <div className="emailList__settingsLeft">
                    <IconButton>
                        <CheckBoxOutlineBlankIcon />
                    </IconButton>
                    <IconButton>
                        <ArrowDropDownIcon />
                    </IconButton>
                    <IconButton>
                        <RefreshIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
                <div className="emailList__settingsRight">
                    <IconButton>
                        <KeyboardArrowLeftIcon />
                    </IconButton>
                    <IconButton>
                        <KeyboardArrowRightIcon />
                    </IconButton>
                    <IconButton>
                        <KeyboardHideIcon />
                    </IconButton>
                    <IconButton>
                        <SettingsIcon />
                    </IconButton>
                </div>
            </div>
            <div className="emailList__sections">
                <Section Icon={InboxIcon} title="Primary" color="#c04b37" selected />
                <Section Icon={PeopleIcon} title="Social" color="#1A73E8" />
                <Section Icon={LocalOfferIcon} title="Promotions" color="green" />
            </div>
            <div className="emailList__list">
                {emails.map(({ id, data: { to, subject, message, timestamp } }) => (
                    <EmailRow
                        id={id}
                        key={id}
                        title={to}
                        subject={subject}
                        description={message}
                        time={new Date(timestamp?.seconds * 1000).toUTCString()} // an excerpt that formats the time in the way that I need it.
                    />
                ))}
                <EmailRow
                    title="Engineer Newsletter"
                    subject="Client Side Rendering"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate, risus a semper molestie, dui turpis semper erat, ac cursus massa est eu metus. Cras sodales urna id semper eleifend. Aenean at sagittis leo, vitae varius nunc."
                    time="Tue, 17 May 2022 19:35:07 GMT"
                />
                <EmailRow
                    title="Engineer Newsletter"
                    subject="Server Side Rendering"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate, risus a semper molestie, dui turpis semper erat, ac cursus massa est eu metus. Cras sodales urna id semper eleifend. Aenean at sagittis leo, vitae varius nunc."
                    time="Tue, 17 May 2022 19:34:07 GMT"
                />
            </div>
        </div>
    )
}

export default EmailList