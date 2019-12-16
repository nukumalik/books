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
	const [price, setPrice] = useState('')
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
			.set(book)
		props.navigation.navigate('List')
	}

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
							Add Book
						</Text>
					</View>
					<Form style={{paddingHorizontal: 15}}>
						<Item floatingLabel>
							<Label>Code</Label>
							<Input onChangeText={text => setCode(text)} />
						</Item>
						<Item floatingLabel>
							<Label>ISBN</Label>
							<Input onChangeText={text => setIsbn(text)} />
						</Item>
						<Item floatingLabel>
							<Label>Title</Label>
							<Input onChangeText={text => setTitle(text)} />
						</Item>
						<Item floatingLabel>
							<Label>Description</Label>
							<Input onChangeText={text => setDescription(text)} />
						</Item>
						<Item floatingLabel>
							<Label>Category</Label>
							<Input onChangeText={text => setCategory(text)} />
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
						<Item floatingLabel>
							<Label>Price</Label>
							<Input
								keyboardType="number-pad"
								onChangeText={text => setPrice(text)}
							/>
						</Item>
						<Item floatingLabel>
							<Label>Cover</Label>
							<Input onChangeText={text => setCover(text)} />
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
