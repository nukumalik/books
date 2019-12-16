/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import {View, Text, TextInput, ScrollView} from 'react-native'
import {Button, Input, Form, Item, DatePicker, Label} from 'native-base'
import firestore from '@react-native-firebase/firestore'

const Add = props => {
	const [code, setCode] = useState('')
	const [isbn, setIsbn] = useState('')
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [category, setCategory] = useState('')
	const [publishedAt, setPublishedAt] = useState('')
	const [price, setPrice] = useState(0)
	const [cover, setCover] = useState('')

	const goSubmit = async () => {
		const book = {
			code,
			isbn,
			title,
			description,
			category,
			publishedAt,
			price,
			cover,
		}
		await firestore()
			.collection('books')
			.doc(code)
			.update(book)
		props.navigation.navigate('List')
	}

	const getData = async () => {
		const data = await firestore()
			.collection('books')
			.doc(props.navigation.getParam('code'))
			.get()
		setCode(data._data.code)
		setIsbn(data._data.isbn)
		setTitle(data._data.title)
		setDescription(data._data.description)
		setCategory(data._data.category)
		setPublishedAt(data._data.publishedAt)
		setPrice(data._data.price)
		setCover(data._data.cover)
	}

	useState(() => {
		getData()
	}, [])

	return (
		<>
			<View style={{marginVertical: 20}}>
				<ScrollView>
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<Text
							style={{
								color: '#000',
								fontWeight: 'bold',
								fontSize: 30,
							}}>
							Edit Book
						</Text>
					</View>
					<Form style={{paddingHorizontal: 15}}>
						<Item>
							<Input
								defaultValue={code}
								onChangeText={text => setCode(text || code)}
								placeholder="Code"
							/>
						</Item>
						<Item>
							<Input
								defaultValue={isbn}
								onChangeText={text => setIsbn(text || isbn)}
								placeholder="ISBN"
							/>
						</Item>
						<Item>
							<Input
								defaultValue={title}
								onChangeText={text => setTitle(text || title)}
								placeholder="Title"
							/>
						</Item>
						<Item>
							<Input
								defaultValue={description}
								onChangeText={text => setDescription(text || description)}
								placeholder="Description"
							/>
						</Item>
						<Item>
							<Input
								defaultValue={category}
								onChangeText={text => setCategory(text || category)}
								placeholder="Category"
							/>
						</Item>
						<Item style={{marginTop: 20}}>
							<DatePicker
								defaultDate={new Date(2018, 4, 4)}
								minimumDate={new Date(2018, 1, 1)}
								maximumDate={new Date(2019, 12, 31)}
								locale={'en'}
								timeZoneOffsetInMinutes={undefined}
								modalTransparent={false}
								animationType={'fade'}
								androidMode={'default'}
								placeHolderText="Published"
								textStyle={{color: '#000'}}
								placeHolderTextStyle={{color: '#555'}}
								onDateChange={text => setPublishedAt(text)}
								disabled={false}
							/>
						</Item>
						<Item>
							<Input
								defaultValue={price}
								keyboardType="number-pad"
								onChangeText={text => setPrice(text || price)}
								placeholder="Price"
							/>
						</Item>
						<Item>
							<Input
								defaultValue={cover}
								onChangeText={text => setCover(text || cover)}
								placeholder="Cover"
							/>
						</Item>
						<Button
							onPress={() => goSubmit()}
							style={{
								marginTop: 20,
								justifyContent: 'center',
								backgroundColor: '#000',
							}}>
							<Text style={{color: '#FFF'}}>Submit</Text>
						</Button>
					</Form>
				</ScrollView>
			</View>
		</>
	)
}

export default Add
