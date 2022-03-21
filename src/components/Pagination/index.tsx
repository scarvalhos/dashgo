import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
    totalCountOfRegisters: number;
    registersPerPage?: number;
    currentPage?: number;
    onPageChange: (page: number) => void;
}

const siblingsCount = 1

function generatePageArray(from: number, to: number) {
    const newArray = [...new Array(to - from)]

    const indexNewArray = newArray.length

    return newArray.map(i => from + indexNewArray).filter(page => page > 0)
}

export function Pagination({
        totalCountOfRegisters,
        currentPage = 1,
        onPageChange,
        registersPerPage = 10
}: PaginationProps) {
    const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage)

    const previousPages = currentPage > 1 ? generatePageArray((currentPage - 1) - siblingsCount, currentPage - 1) :   []

    const nextPages = currentPage < lastPage ? generatePageArray(currentPage, Math.min(currentPage + siblingsCount, lastPage)) :   []

    return (
        <Stack
            direction={["column", "row"]}
            mt="8"
            justify="space-between"
            align="center"
            spacing="6"
        >
            <Box>
                <HStack>
                    <strong>
                        {currentPage * registersPerPage - registersPerPage + 1}
                    </strong>
                        <Text> - </Text>
                    <strong>
                        {currentPage === lastPage ? totalCountOfRegisters : registersPerPage * currentPage}
                    </strong>
                        <Text> de </Text>
                    <strong>
                        {totalCountOfRegisters}
                    </strong>
                </HStack>
            </Box>
            <Stack direction="row" spacing="2" >

                //* Show the first page *//

                { currentPage > (1 + siblingsCount) && (
                    <>
                        <PaginationItem onPageChange={onPageChange} number={1} />
                        { currentPage > (2 + siblingsCount) && (
                            <Text
                                color="gray.300"
                                width="8"
                                textAlign="center"
                            >
                                ...
                            </Text>
                        ) }
                    </>
                ) }

                //* Show the previous page *//
                
                { previousPages.length > 0 && previousPages.map(page => {
                    return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
                }) }

                //* Show the current page *//

                <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />

                //* Show the next page *//

                { nextPages.length > 0 && nextPages.map(page => {
                    return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
                }) }
                
                //* Show the last page *//

                { (currentPage + siblingsCount) < lastPage && (
                    <>
                        { (currentPage + 1 + siblingsCount) - lastPage && (
                            <Text
                                color="gray.300"
                                width="8"
                                textAlign="center"
                            >
                                ...
                            </Text>
                        ) }
                        <PaginationItem onPageChange={onPageChange} number={lastPage} />
                    </>
                ) }
            </Stack>
        </Stack>
    )
}
