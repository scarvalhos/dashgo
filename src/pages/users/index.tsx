import Link from "next/link";

import {
    Box,
    Button,
    Checkbox,
    Flex,
    Heading,
    HStack,
    Icon,
    Spinner,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useBreakpointValue,
    Link as ChakraLink
} from "@chakra-ui/react";

import { RiAddLine, RiPencilLine, RiRefreshLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useUsers } from "../../services/hooks/useUsers";
import { useState } from "react";

export default function UserList() {
    const [ page, setPage ] = useState(1)
    const { data, isLoading, isFetching, refetch, error } = useUsers(page)

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    async function handlePrefetchUser(userId: string) {
        await queryClient.prefetchQuery(['user', userId], async () => {
            const response = await api.get(`/users/${userId}`)

            return response.data;
        }, {
            staleTime: 1000 * 60 * 10 // 10 minutes
        })
    }

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxW={1480} mx="auto" px="6" >
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8" >
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">
                            Usuários
                            { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" /> }
                        </Heading>

                        <HStack>
                            <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                cursor="pointer"
                                bg="gray.700"
                                _hover={{
                                    bgColor: 'gray.500'
                                }}
                                leftIcon={<Icon as={RiRefreshLine} fontSize="20" />}
                                onClick={() => refetch()}
                            >
                                Refresh
                            </Button>
                            <Link href="/users/create" passHref>
                                <Button
                                    as="a"
                                    size="sm"
                                    fontSize="sm"
                                    colorScheme="pink"
                                    leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                                >
                                    Criar novo usuário
                                </Button>
                            </Link>
                        </HStack>
                    </Flex>

                    { isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados dos usuários!</Text>
                        </Flex>
                    ) : (
                        <>     
                            <Table colorScheme="whiteAlpha" >
                                <Thead>
                                    <Tr>
                                        <Th px={["4", "4", "6"]} color="gray.300" w="8">
                                            <Checkbox colorScheme="pink" />
                                        </Th>
                                        <Th>Usuário</Th>
                                        { isWideVersion && <Th>Data de cadastro</Th> }
                                        { isWideVersion && <Th w="8"></Th> }
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    { data.users.map(user => {
                                        return (
                                            <Tr key={user.id}>
                                                <Td px={["4", "4", "6"]}>
                                                    <Checkbox colorScheme="pink" />
                                                </Td>
                                                <Td>
                                                    <Box>
                                                        <ChakraLink color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                                            <Text fontWeight="bold">{user.name}</Text>
                                                        </ChakraLink>
                                                        <Text fontSize="sm" color="gray.300">{user.email}</Text>
                                                    </Box>
                                                </Td>
                                                { isWideVersion && <Td>{user.createdAt}</Td> }
                                                { isWideVersion && (
                                                    <Td>
                                                        <Button
                                                            as="a"
                                                            size="sm"
                                                            fontSize="sm"
                                                            colorScheme="messenger"
                                                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                                                        >
                                                            Editar
                                                        </Button>
                                                    </Td>
                                                )}
                                                
                                            </Tr>
                                        )
                                    }) }
                                </Tbody>
                            </Table>

                            <Pagination
                                totalCountOfRegisters={data.totalCount}
                                currentPage={page}
                                onPageChange={setPage}
                            />
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    )
}
