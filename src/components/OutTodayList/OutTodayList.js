import React from 'react';
import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as holidayRequestConstants from '../../constants/holidayRequestConstants';
import * as holidayRequestService from '../../services/holidayRequestService';
import * as userService from '../../services/userService';

const useStyles = makeStyles({
    main: {
        position: 'absolute',
        right: 0,
        top: 142,
        width: 200,
        textAlign: 'center',
        marginRight: '20px',
        border: '1px solid #3b4a4e',
        borderRadius: '20px',
        padding: '15px',
    },
    list: {
        maxHeight: '40vh',
        overflowY: 'auto',
        borderRadius: '20px',
    },
    title: {
        fontWeight: 'bold',
    }
});

const OutTodayList = () => {
    const classes = useStyles();
    const [requests, setRequests] = useState([]);
    const [users, setUsers] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);

    useEffect(() => {
        holidayRequestService.getAllAsync()
            .then(result => {
                const dateNow = new Date().toISOString();

                let filterHolidayRequests = result.filter(x => (x.startDate <= dateNow && x.endDate >= dateNow) && x.status == holidayRequestConstants.ApprovedStatus);

                setRequests(filterHolidayRequests);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        userService.getAllAsync()
            .then(result => {
                setUsers(result);
            })
            .catch((error) => {
                console.log(error);
            })

        filterOutTodayUsers();
    }, [requests]);

    const filterOutTodayUsers = () => {
        const filterUsers = users?.filter(user => requests.some(x => x.userId == user.id));

        setFilterUsers(filterUsers);
    }

    return (
        <div className={classes.main}>
            <h5 className={classes.title}>Out today</h5>
            <hr />
            <List className={classes.list}>
                {filterUsers?.length != 0 ?
                    <>
                        {filterUsers?.map((user) => (
                            <ListItem key={user.id}>
                                <ListItemText>
                                    <h6 alt={user?.userName} width="40" height="40" style={{ fontWeight: 'bold', textAlign: 'center' }}>{user?.userName}</h6>
                                </ListItemText>
                                {/* <ListItemText primary={user?.userName} /> */}
                            </ListItem>
                        ))}
                    </> : <h6 style={{ textAlign: 'center', fontWeight: 'bold' }}>No employees</h6>}
            </List>
        </div>
    );
};

export default OutTodayList; 
