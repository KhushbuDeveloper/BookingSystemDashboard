'use client'
import React from 'react';
import { Box, Button, Typography, styled, Divider } from "@mui/material";
import { tokens } from "@/theme";
import Layout from '@/app/components/LayoutWrapper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { mockDataReservation } from "@/app/data/mockData";
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Drawer from '@mui/material/Drawer';
const drawerWidth = 400;
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 3, px: 1 }}>{children}</Box>}
        </div>
    );
}

const reservationlist = () => {
    const colors = tokens('dark');
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handleEdit = (row: any) => {
        // Implement your edit logic here
        console.log('Edit row:', row);
    };

    const handleDelete = (row: any) => {
        // Implement your delete logic here
        console.log('Delete row:', row);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 2),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'space-between',
    }));
    const columns = [
        {
            field: "time",
        },
        {
            field: "name",
            cellClassName: "name-column--cell",
            flex: 1,
        },
        {
            field: "tableId",
            renderCell: (params: any) => `Table: ${params.value.toString()}`,
        },
        {
            field: "pax",
            flex: 1,
            renderCell: (params: any) => `Person: ${params.value.toString()}`,
        },
        {
            field: "actions",
            width: 150,
            renderCell: (params: GridCellParams) => (
                <div>
                    <IconButton color="secondary" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(params.row)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            ),
        }
    ];
    return (
        <Layout>
            <Box m="20px">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography
                        variant="h2"
                        color={colors.grey[100]}
                        fontWeight="bold"
                    >
                        Table Reservation
                    </Typography>
                    <Box>
                        <Button
                            sx={{
                                backgroundColor: colors.blueAccent[700],
                                color: colors.grey[100],
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "5px 10px",
                                textTransform: 'capitalize'
                            }}
                            onClick={handleDrawerOpen}>
                            Add New Reservation
                        </Button>
                    </Box>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
                    <Box width={'100%'}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Seated" />
                            <Tab label="Upcoming" />
                            <Tab label="Waiting" />
                        </Tabs>
                        <CustomTabPanel value={value} index={0}>
                            <Box
                                sx={{
                                    "& .MuiDataGrid-root": {
                                        border: "none",
                                    },
                                    "& .MuiDataGrid-cell": {
                                        borderBottom: "none",
                                    },
                                    "& .name-column--cell": {
                                        color: colors.greenAccent[300],
                                    },
                                    "& .MuiDataGrid-columnHeaders": {
                                        backgroundColor: colors.blueAccent[700],
                                        borderBottom: "none",
                                    },
                                    "& .MuiDataGrid-virtualScroller": {
                                        backgroundColor: colors.primary[400],
                                    },
                                    "& .MuiDataGrid-footerContainer": {
                                        borderTop: "none",
                                        backgroundColor: colors.blueAccent[700],
                                    },
                                    "& .MuiCheckbox-root": {
                                        color: `${colors.greenAccent[200]} !important`,
                                    },
                                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                        color: `${colors.grey[100]} !important`,
                                    },
                                    '& .MuiDataGrid-scrollbar--vertical': {
                                        display: 'none'
                                    }
                                }}
                            >
                                <DataGrid
                                    rows={mockDataReservation}
                                    columns={columns}
                                    sx={{
                                        '& .MuiDataGrid-scrollContainer': {
                                            overflow: 'hidden', // Hide scrollbars on the scroll container
                                        },
                                        '& .MuiDataGrid-columnHeaders': {
                                            display: 'none', // Hide header
                                        },
                                        '& .MuiDataGrid-footerContainer': {
                                            display: 'none', // Hide footer
                                        },
                                    }}

                                />
                            </Box>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <Box
                                sx={{
                                    "& .MuiDataGrid-root": {
                                        border: "none",
                                    },
                                    "& .MuiDataGrid-cell": {
                                        borderBottom: "none",
                                    },
                                    "& .name-column--cell": {
                                        color: colors.greenAccent[300],
                                    },
                                    "& .MuiDataGrid-columnHeaders": {
                                        backgroundColor: colors.blueAccent[700],
                                        borderBottom: "none",
                                    },
                                    "& .MuiDataGrid-virtualScroller": {
                                        backgroundColor: colors.primary[400],
                                    },
                                    "& .MuiDataGrid-footerContainer": {
                                        borderTop: "none",
                                        backgroundColor: colors.blueAccent[700],
                                    },
                                    "& .MuiCheckbox-root": {
                                        color: `${colors.greenAccent[200]} !important`,
                                    },
                                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                        color: `${colors.grey[100]} !important`,
                                    },
                                    '& .MuiDataGrid-scrollbar--vertical': {
                                        display: 'none'
                                    }
                                }}
                            >
                                <DataGrid
                                    rows={mockDataReservation}
                                    columns={columns}
                                    sx={{
                                        '& .MuiDataGrid-scrollContainer': {
                                            overflow: 'hidden', // Hide scrollbars on the scroll container
                                        },
                                        '& .MuiDataGrid-columnHeaders': {
                                            display: 'none', // Hide header
                                        },
                                        '& .MuiDataGrid-footerContainer': {
                                            display: 'none', // Hide footer
                                        },
                                    }}

                                />
                            </Box>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <Box
                                sx={{
                                    "& .MuiDataGrid-root": {
                                        border: "none",
                                    },
                                    "& .MuiDataGrid-cell": {
                                        borderBottom: "none",
                                    },
                                    "& .name-column--cell": {
                                        color: colors.greenAccent[300],
                                    },
                                    "& .MuiDataGrid-columnHeaders": {
                                        backgroundColor: colors.blueAccent[700],
                                        borderBottom: "none",
                                    },
                                    "& .MuiDataGrid-virtualScroller": {
                                        backgroundColor: colors.primary[400],
                                    },
                                    "& .MuiDataGrid-footerContainer": {
                                        borderTop: "none",
                                        backgroundColor: colors.blueAccent[700],
                                    },
                                    "& .MuiCheckbox-root": {
                                        color: `${colors.greenAccent[200]} !important`,
                                    },
                                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                        color: `${colors.grey[100]} !important`,
                                    },
                                    '& .MuiDataGrid-scrollbar--vertical': {
                                        display: 'none'
                                    }
                                }}
                            >
                                <DataGrid
                                    rows={mockDataReservation}
                                    columns={columns}
                                    sx={{
                                        '& .MuiDataGrid-scrollContainer': {
                                            overflow: 'hidden', // Hide scrollbars on the scroll container
                                        },
                                        '& .MuiDataGrid-columnHeaders': {
                                            display: 'none', // Hide header
                                        },
                                        '& .MuiDataGrid-footerContainer': {
                                            display: 'none', // Hide footer
                                        },
                                    }}

                                />
                            </Box>
                        </CustomTabPanel>
                    </Box>
                </Box>
            </Box>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DrawerHeader>
                    <Typography
                        variant="h4"
                        color={colors.grey[100]}
                        fontWeight="bold"
                    >
                        Add New Reservation
                    </Typography>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "3px 10px",
                            textTransform: 'capitalize'
                        }}
                        onClick={handleDrawerOpen}>
                        Save
                    </Button>
                </DrawerHeader>
                <Divider />
                <Box p={2}>
                    <Typography
                        variant="h5"
                        color={colors.grey[100]}
                        fontWeight="bold"
                    >
                        Reservation Details
                    </Typography>
                    
                </Box>
            </Drawer>
        </Layout>
    );
};

export default reservationlist;
