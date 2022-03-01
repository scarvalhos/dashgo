import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex align="center">
            { showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Samara Assis</Text>
                    <Text color="gray.300" fontSize="small">
                        samcarvalhosa@hotmail.com
                    </Text>
                </Box>
            ) }

            <Avatar
                size="md"
                name="Samara Assis"
                src="https://github.com/scarvalhos.png"
            />
        </Flex>
    )
}