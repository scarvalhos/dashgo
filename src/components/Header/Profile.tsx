import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
    return (
        <Flex align="center">
            <Box mr="4" textAlign="right">
                <Text>Samara Assis</Text>
                <Text color="gray.300" fontSize="small">
                    samcarvalhosa@hotmail.com
                </Text>
            </Box>

            <Avatar
                size="md"
                name="Samara Assis"
                src="https://github.com/scarvalhos.png"
            />
        </Flex>
    )
}