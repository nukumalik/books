import React, {useState, useEffect, Fragment} from 'react'
import {View, Text, ScrollView} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import {Tabs, Tab} from 'native-base'

const Detail = props => {
	const [code, setCode] = useState('')
	const [isbn, setIsbn] = useState('')
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [category, setCategory] = useState('')
	const [publishedAt, setPublishedAt] = useState('')
	const [price, setPrice] = useState(0)
	const [cover, setCover] = useState('')

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

	useEffect(() => {
		getData()
	}, [])

	return (
		<>
			<ScrollView>
				<Tabs>
					<Tab heading="Profile">
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<Text style={style.title}>Cover</Text>
							<Text>{cover ? cover : ''}</Text>
							<Text style={style.title}>Title</Text>
							<Text>{title ? title : ''}</Text>
							<Text style={style.title}>Description</Text>
							<Text>{description ? description : ''}</Text>
						</View>
					</Tab>
					<Tab heading="Detail">
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<Text style={style.title}>Code:</Text>
							<Text>{code ? code : ''}</Text>
							<Text style={style.title}>ISBN:</Text>
							<Text>{isbn ? isbn : ''}</Text>
							<Text style={style.title}>Category</Text>
							<Text>{category ? category : ''}</Text>
							<Text style={style.title}>Price</Text>
							<Text>{price ? price : ''}</Text>
						</View>
					</Tab>
				</Tabs>
			</ScrollView>
		</>
	)
}

const style = {
	title: {
		fontWeight: 'bold',
		fontSize: 20,
		marginTop: 10,
		marginBottom: 3,
	},
}

export default Detail
