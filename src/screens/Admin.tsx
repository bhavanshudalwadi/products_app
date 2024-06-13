import { Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button, ButtonText, HStack, Text, Textarea, View } from '@gluestack-ui/themed'
import { Input } from '@gluestack-ui/themed'
import { InputField } from '@gluestack-ui/themed'
import { TextareaInput } from '@gluestack-ui/themed'
import { addProduct } from '../db/databaseService'

const Admin = () => {
    const [name, setName] = useState<string>("")
    const [imgUrl, setImgUrl] = useState<string>("")
    const [price, setPrice] = useState<string>("")
    const [mrp, setMrp] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [desc, setDesc] = useState<string>("")

    const handleProductAdd = async () => {
        const result = await addProduct(name, imgUrl, desc, parseFloat(price), parseFloat(mrp), category);
        if(result && result.length > 0 && result[0].rowsAffected > 0) {
            Alert.alert('Success', 'Product added successful')
        }else {
            Alert.alert('Failed', 'Failed to add product')
        }
    }

    return (
        <View marginHorizontal="$3">
            <Input
                style={styles.input}
                size="lg"
                marginVertical="$2"
            >
                <InputField placeholder="Enter product name" value={name} onChangeText={setName} />
            </Input>
            <Input
                style={styles.input}
                size="lg"
                marginVertical="$2"
            >
                <InputField placeholder="Enter product image url" value={imgUrl} onChangeText={setImgUrl} />
            </Input>
            <HStack w="$full" style={{gap: 8}}>
                <Input
                    style={styles.input}
                    size="lg"
                    w="49%"
                    marginVertical="$2"
                >
                    <InputField placeholder="Enter product price" keyboardType='numeric' value={price} onChangeText={setPrice} />
                </Input>
                <Input
                    style={styles.input}
                    size="lg"
                    w="49%"
                    marginVertical="$2"
                >
                    <InputField placeholder="Enter product mrp" keyboardType='numeric' value={mrp} onChangeText={setMrp} />
                </Input>
            </HStack>
            <Input
                style={styles.input}
                size="lg"
                marginVertical="$2"
            >
                <InputField placeholder="Enter product category" value={category} onChangeText={setCategory} />
            </Input>
            <Textarea
                style={styles.input}
                size="lg"
                marginVertical="$2"
            >
                <TextareaInput placeholder="Enter product description" value={desc} onChangeText={setDesc} />
            </Textarea>
            <Button mt="$2" onPress={handleProductAdd}>
                <ButtonText>Add Product</ButtonText>
            </Button>
        </View>
    )
}

export default Admin

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
    }
})