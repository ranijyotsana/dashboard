import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBorrowers = createAsyncThunk('borrowers/fetch', async ({page=1,limit=6}) => {
  const res = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${(page-1)*limit}`);
  if(!res.ok) throw new Error('Failed to fetch');
  const data = await res.json();
  // map to loan-like fields
  const mapped = data.users.map(u => ({
    id: u.id,
    name: u.firstName + ' ' + u.lastName,
    loanId: 'LN' + String(u.id).padStart(4,'0'),
    status: (u.age % 3 === 0) ? 'Overdue' : (u.age % 2 === 0) ? 'Active' : 'Paid',
    amountDue: (u.age * 2500) % 20000,
    dueDate: '2025-11-' + String((u.id % 28)+1).padStart(2,'0'),
    raw: u
  }));
  return { borrowers: mapped, total: data.total };
});

const borrowersSlice = createSlice({
  name: 'borrowers',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    total: 0,
    page: 1,
    limit: 6
  },
  reducers: {
    setPage(state, action){ state.page = action.payload; }
  },
  extraReducers(builder){
    builder
      .addCase(fetchBorrowers.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchBorrowers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.borrowers;
        state.total = action.payload.total;
      })
      .addCase(fetchBorrowers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setPage } = borrowersSlice.actions;
export default borrowersSlice.reducer;
