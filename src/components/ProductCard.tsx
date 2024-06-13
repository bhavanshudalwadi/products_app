import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, Button, ButtonText, Card, HStack, Image, Text, VStack, View } from '@gluestack-ui/themed'
import { Heading } from '@gluestack-ui/themed'

const ProductCard = ({ name, img, desc, price, mrp, category }: any) => {
    return (
        <Card p="$3" borderRadius="$lg" maxWidth={170} m="$2">
            <Image
                mb="$1"
                h={150}
                alt='product image'
                width="$full"
                borderRadius="$md"
                source={{
                    uri: img,
                }}
            />
            <Text
                fontSize="$sm"
                fontStyle="normal"
                fontFamily="$heading"
                fontWeight="$normal"
                lineHeight="$sm"
                mb="$2"
                sx={{
                    color: "$textLight700",
                    _dark: {
                        color: "$textDark200",
                    },
                }}
            >
                { category }
            </Text>
            <VStack>
                <Heading size="md" fontFamily="$heading" mb="$1">
                    { name }
                </Heading>
                <HStack alignItems='center'>
                    <Heading style={styles.price} size='xl' fontFamily="$heading" mb="$1" mr="$1">
                        ₹ { price }
                    </Heading>
                    <Heading style={styles.mrp} size="md" fontFamily="$heading" mb="$1">
                        { mrp }
                    </Heading>
                </HStack>
            </VStack>
            <Box
                flexDirection="column"
                sx={{
                    "@sm": {
                        flexDirection: "row",
                    },
                }}
            >
                <Button
                    px="$4"
                    py="$1"
                    fontFamily="$heading"
                    mr="$0"
                    mb="$1"
                    sx={{
                        "@sm": {
                            mr: "$3",
                            mb: "$0",
                            flex: 1,
                        },
                    }}
                >
                    <ButtonText size="sm">Add to cart</ButtonText>
                </Button>
            </Box>
        </Card>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    price: {
        
    },
    mrp: {
        color: '#999',
        textDecorationLine: 'line-through',
    }
})