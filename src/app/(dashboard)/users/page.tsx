'use client';

import * as React from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Avatar,
    Chip,
    IconButton,
    Tooltip,
    CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';
import { useUserStore } from '@/store/useUserStore';
import { debounce } from 'lodash';

export default function UsersPage() {
    const {
        users,
        total,
        skip,
        limit,
        isLoading,
        searchTerm,
        fetchUsers,
        setSearchTerm
    } = useUserStore();

    // Initial fetch
    React.useEffect(() => {
        fetchUsers(skip, limit);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only on mount, subsequent fetches handled by pagination/search overrides or store logic if refined

    const handleChangePage = (event: unknown, newPage: number) => {
        // API uses skip/limit. newPage is 0-indexed.
        const newSkip = newPage * limit;
        fetchUsers(newSkip, limit);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newLimit = parseInt(event.target.value, 10);
        fetchUsers(0, newLimit); // Reset to first page with new limit
    };

    // Debounce search to avoid API spam
    const handleSearch = React.useCallback(
        debounce((value: string) => {
            setSearchTerm(value);
            fetchUsers(0, limit); // Fetch immediately with new term, reset to page 0
        }, 500),
        [limit, fetchUsers, setSearchTerm]
    );

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleSearch(e.target.value);
    };

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h4" fontWeight="bold">
                    Users
                </Typography>
                <TextField
                    variant="outlined"
                    placeholder="Search users..."
                    defaultValue={searchTerm}
                    onChange={onSearchChange}
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ width: 300, bgcolor: 'background.paper', borderRadius: 1 }}
                />
            </Box>

            <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 3, boxShadow: 3 }}>
                <TableContainer sx={{ maxHeight: '70vh' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Company</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading && users.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 10 }}>
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map((user) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar src={user.image} alt={user.firstName} />
                                                <Typography variant="subtitle2" fontWeight="medium">
                                                    {user.firstName} {user.lastName}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.gender}
                                                size="small"
                                                color={user.gender === 'male' ? 'primary' : 'secondary'}
                                                variant="outlined"
                                                sx={{ textTransform: 'capitalize' }}
                                            />
                                        </TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>{user.company.title}</TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="View Details">
                                                <IconButton component={Link} href={`/users/${user.id}`}>
                                                    <VisibilityIcon color="action" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                            {!isLoading && users.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                                        No users found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={total}
                    rowsPerPage={limit}
                    page={Math.floor(skip / limit)}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
