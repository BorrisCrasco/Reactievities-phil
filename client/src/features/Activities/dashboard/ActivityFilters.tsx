import { FilterList, Event, ExpandMore } from "@mui/icons-material";
import { Box, ListItemText, MenuItem, MenuList, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import 'react-calendar/dist/Calendar.css';
import Calendar from "react-calendar";
import { useStore } from "../../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";

const ActivityFilters = observer(function ActivityFilters() {

    const { activityStore: { setFilter, setStartDate, filter, startDate } } = useStore();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 3 }}>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
                        <FilterList sx={{ mr: 1 }} />
                        Filters
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <MenuList>
                        <MenuItem
                            selected={filter === 'all'}
                            onClick={() => setFilter('all')}
                        >
                            <ListItemText primary='All events' />
                        </MenuItem>
                        <MenuItem
                            selected={filter === 'isGoing'}
                            onClick={() => setFilter('isGoing')}
                        >
                            <ListItemText primary="I'm going" />
                        </MenuItem>
                        <MenuItem
                            selected={filter === 'isHost'}
                            onClick={() => setFilter('isHost')}
                        >
                            <ListItemText primary="I'm hosting" />
                        </MenuItem>
                    </MenuList>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
                        <Event sx={{ mr: 1 }} />
                        Select date
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Calendar 
                        value={startDate}
                        onChange={date => setStartDate(date as Date)}
                    />
                </AccordionDetails>
            </Accordion>
        </Box>
    )
})

export default ActivityFilters;
