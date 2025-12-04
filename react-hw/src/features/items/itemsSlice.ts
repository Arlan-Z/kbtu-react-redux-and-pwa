import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getById, searchItems, type Character } from '../../services/itemsService'

export interface ItemsState {
  list: Character[]
  selectedItem: Character | null
  loadingList: boolean
  loadingItem: boolean
  errorList: string | null
  errorItem: string | null
  query: string
}

const initialState: ItemsState = {
  list: [],
  selectedItem: null,
  loadingList: false,
  loadingItem: false,
  errorList: null,
  errorItem: null,
  query: '',
}


export const fetchItems = createAsyncThunk<Character[], string>(
  'items/fetchItems',
  async (query) => {
    return await searchItems(query)
  }
)

export const fetchItemById = createAsyncThunk<Character, string>(
  'items/fetchItemById',
  async (id) => {
    return await getById(id)
  }
)


const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state, action) => {
        state.loadingList = true
        state.errorList = null
        state.query = action.meta.arg
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loadingList = false
        state.list = action.payload
        state.errorList = null
        state.query = action.meta.arg
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loadingList = false
        state.list = []
        state.errorList = action.error.message ?? 'Nothing found or API error'
        state.query = action.meta.arg
      })

      .addCase(fetchItemById.pending, (state) => {
        state.loadingItem = true
        state.errorItem = null
        state.selectedItem = null
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.loadingItem = false
        state.selectedItem = action.payload
        state.errorItem = null
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loadingItem = false
        state.selectedItem = null
        state.errorItem = action.error.message ?? 'Character not found'
      })
  },
})

export default itemsSlice.reducer
