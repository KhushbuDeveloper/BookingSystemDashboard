'use client'
import { Box, Typography, Grid } from "@mui/material";
import { tokens } from "../../theme";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "@/app/components/Header";
import StatBox from "@/app/components/StatBox";
import Layout from '@/app/components/LayoutWrapper';
import BookingTrendsChart from '@/app/components/BookingTrendsChart';
import PeakBookingTimesChart from '@/app/components/PeakBookingTimesChart';
import RevenueAnalysisChart from '@/app/components/RevenueAnalysisChart';
import CustomerInsightsChart from '@/app/components/CustomerInsightsChart';
import { BookingTrends, PeakBookingTimes,RevenueData,CustomerInsights } from "@/app/data/mockData";
const Dashboard = () => {
  const colors = tokens('dark');

  return (
    <Layout>
      <Box m="20px">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        {/* GRID & CHARTS */}
        {/* <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          <Box
            gridColumn="span 3"
            sx={{ backgroundColor: colors.primary[600] }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="12,361"
              subtitle="Emails Sent"
              progress="0.75"
              increase="+14%"
              icon={
                <EmailIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            sx={{ backgroundColor: colors.primary[600] }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="431,225"
              subtitle="Sales Obtained"
              progress="0.50"
              increase="+21%"
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            sx={{ backgroundColor: colors.primary[600] }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="32,441"
              subtitle="New Clients"
              progress="0.30"
              increase="+5%"
              icon={
                <PersonAddIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            sx={{ backgroundColor: colors.primary[600] }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="1,325,134"
              subtitle="Traffic Received"
              progress="0.80"
              increase="+43%"
              icon={
                <TrafficIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Box> */}
        <Grid container spacing={2} mt="25px">
          <Grid item xs={8}>
            <Box
              sx={{
                backgroundColor: colors.primary[600],
                width: '100%',
                p: "30px"
              }}
            >
              <Typography variant="h5" color={colors.grey[100]}>
                Booking Trends
              </Typography>
              <Box height="250px" >
                <BookingTrendsChart data={BookingTrends} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                backgroundColor: colors.primary[600],
                width: '100%',
                p: "30px"
              }}
            >
              <Typography variant="h5" color={colors.grey[100]}>
              Customer Insights           
                </Typography>
              <Box height="250px" >
                <CustomerInsightsChart data={CustomerInsights} />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt="25px">
          <Grid item xs={12}>
            <Box
              sx={{
                backgroundColor: colors.primary[600],
                width: '100%',
                p: "30px"
              }}
            >
              <Typography variant="h5" color={colors.grey[100]}>
                Peak Booking Times
              </Typography>
              <Box height="250px" >
                <PeakBookingTimesChart data={PeakBookingTimes} />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt="25px">
          <Grid item xs={12}>
            <Box
              sx={{
                backgroundColor: colors.primary[600],
                width: '100%',
                p: "30px"
              }}
            >
              <Typography variant="h5" color={colors.grey[100]}>
                Revenue Analysis              
                </Typography>
              <Box height="250px" >
                <RevenueAnalysisChart data={RevenueData} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Dashboard;