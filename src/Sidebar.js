import { Button, IconButton } from '@mui/material'
import React from 'react'
import "./Sidebar.css"
import AddIcon from '@mui/icons-material/Add';
import InboxIcon from '@mui/icons-material/Inbox';
import SidebarOption from './SidebarOption';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import SendIcon from '@mui/icons-material/Send';
import NoteIcon from '@mui/icons-material/Note';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import DuoIcon from '@mui/icons-material/Duo';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useDispatch } from 'react-redux'; // is a keyword from Redux and allows access to the data layer
import { openSendMessage } from "./features/mailSlice" // is the function defined in the mailSlice.js that I am using to open the SendMail component whenever the Compose button is clicked

function Sidebar() {
    const dispatch = useDispatch();

    return (
        <div className="sidebar">
            <Button
                className="sidebar__compose"
                startIcon={<AddIcon fontSize="large" />}
                onClick={() => dispatch(openSendMessage())}
            >
                COMPOSE
            </Button>

            <SidebarOption Icon={InboxIcon} title="Inbox" number={Math.floor(Math.random() * 20 + 10)} selected="true" />
            <SidebarOption Icon={StarIcon} title="Starred" number={Math.floor(Math.random() * 25 + 1)} />
            <SidebarOption Icon={AccessTimeIcon} title="Snoozed" number={Math.floor(Math.random() * 25 + 1)} />
            <SidebarOption Icon={LabelImportantIcon} title="Important" number={Math.floor(Math.random() * 30 + 1)} />
            <SidebarOption Icon={SendIcon} title="Sent" number={Math.floor(Math.random() * 100 + 1)} />
            <SidebarOption Icon={NoteIcon} title="Drafts" number={Math.floor(Math.random() * 15 + 1)} />
            <SidebarOption Icon={ExpandMoreIcon} title="More" />

            <div className="sidebar__footer">
                <div className="sidebar__footerIcons">
                    <IconButton>
                        <PersonIcon />
                    </IconButton>
                    <IconButton>
                        <DuoIcon />
                    </IconButton>
                    <IconButton>
                        <LocalPhoneIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Sidebar