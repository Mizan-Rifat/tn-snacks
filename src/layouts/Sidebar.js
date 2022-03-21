import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const navigate = useNavigate();

  const { currentUser } = useSelector(state => state.users);

  const [listItems, setListItems] = useState([]);

  const handleClick = to => {
    navigate(to);
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const items = currentUser
      ? currentUser.role === 'admin'
        ? [
            {
              title: 'Home',
              to: '/admin',
              icon: <HomeIcon />
            },
            {
              title: 'Users',
              to: '/admin/users',
              icon: <GroupIcon />
            },
            {
              title: 'Snack Items',
              to: 'admin/items',
              icon: <FastfoodIcon />
            },
            {
              title: 'Snack Orders History',
              to: '/orders/history',
              icon: <RestaurantMenuIcon />
            }
          ]
        : [
            {
              title: 'Home',
              to: '/',
              icon: <HomeIcon />
            },
            {
              title: 'Snack Orders History',
              to: '/orders/history',
              icon: <RestaurantMenuIcon />
            }
          ]
      : [];
    setListItems(items);
  }, [currentUser]);

  return (
    <List>
      {listItems.map(item => (
        <>
          <ListItem button key={item.to} onClick={() => handleClick(item.to)}>
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  );
};

export default Sidebar;
