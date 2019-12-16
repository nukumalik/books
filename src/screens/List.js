/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react'
import firestore from '@react-native-firebase/firestore'
import {
	View,
	Text,
	TextInput,
	FlatList,
	CheckBox,
	TouchableOpacity,
} from 'react-native'
import {Button} from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-community/async-storage'

const List = props => {
	const [books, setBooks] = useState()
	const [search, setSearch] = useState('')
	const [searchData, setSearchData] = useState([])

	const getData = async () => {
		await firestore()
			.collection('books')
			.onSnapshot(query => setBooks(query.docs))
	}

	if (searchData === undefined) {
		if (search.length >= 3) {
			setSearchData(books.filter(v => v._data.title === search))
		}
	}

	const goDelete = async id => {
		await firestore()
			.collection('books')
			.doc(id)
			.delete()
	}

	useState(() => {
		getData()
	})

	console.log(books)

	return (
		<>
			<View style={{width: '100%'}}>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						width: '100%',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<View style={{}}>
						<Button
							style={style.button}
							onPress={() => props.navigation.navigate('Add')}>
							<Text style={style.buttonText}>Add</Text>
						</Button>
					</View>
					<View>
						<Button style={style.button}>
							<Text style={style.buttonText}>Delete All</Text>
						</Button>
					</View>
				</View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						width: '100%',
						paddingHorizontal: 30,
					}}>
					<View style={style.serachWrapper}>
						<TextInput
							onChangeText={text => setSearch(text)}
							style={style.search}
							placeholder="Search"
						/>
					</View>
					<View style={style.sortWrapper}>
						<Icon name="sort-alphabetical" size={20} />
					</View>
				</View>
			</View>
			<View style={style.wrapper}>
				{search.length !== 3 && (
					<FlatList
						data={books}
						renderItem={({item}) => (
							<View style={style.listWrapper}>
								<View style={style.checkBox}>
									<CheckBox />
								</View>
								<View style={style.title}>
									<TouchableOpacity
										onPress={() =>
											props.navigation.navigate('Detail', {
												code: item._data.code,
											})
										}>
										<Text>{item._data.title}</Text>
									</TouchableOpacity>
								</View>
								<View style={style.action}>
									<View>
										<Button
											transparent
											onPress={() =>
												props.navigation.navigate('Edit', {
													code: item._data.code,
												})
											}
											style={style.actionButton}>
											<Icon name="pencil" size={20} />
										</Button>
									</View>
									<View>
										<Button
											transparent
											onPress={() => goDelete(item._data.code)}
											style={style.actionButton}>
											<Icon name="delete" size={20} />
										</Button>
									</View>
								</View>
							</View>
						)}
						numColumns={1}
						keyExtractor={(item, index) => index.toString()}
					/>
				)}
			</View>
		</>
	)
}

const style = {
	// Button
	button: {
		backgroundColor: '#000',
		margin: 10,
		paddingHorizontal: 10,
		paddingVertical: 20,
	},
	buttonText: {
		color: '#FFF',
	},

	// Search
	serachWrapper: {
		width: '75%',
		marginTop: 20,
		marginBottom: 30,
	},
	search: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#ccc',
		width: 'auto',
		padding: 10,
	},

	// Sort
	sortWrapper: {
		width: '20%',
		marginLeft: 'auto',
		justifyContent: 'center',
	},
	sort: {},

	// Flatlist
	wrapper: {
		width: '100%',
		justifyContent: 'center',
		paddingHorizontal: 30,
	},

	// List
	listWrapper: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
	},
	checkBox: {
		width: 'auto',
		justifyContent: 'center',
	},
	title: {
		justifyContent: 'center',
	},
	action: {
		width: '30%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 'auto',
	},
	actionButton: {
		marginHorizontal: 5,
	},
}

export default List
