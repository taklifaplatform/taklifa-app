import { Button } from '@zix/app/ui/core'
import { CustomIcon } from '@zix/app/ui/icons'

export function CategorieButton({ category, index, setShowModal }: {
    category: {
        name: string,
    },
    index: number,
    setShowModal: (show: boolean) => void
}) {
    return (
        <Button
        onPress={() => setShowModal(true)}
            key={index}
            backgroundColor={'rgba(255, 251, 237, 0.5)'}
            color={'$black'}
            marginHorizontal='$2'
            width={'20%'}
            borderRadius='$6'
            borderWidth={'$0.5'}
            borderColor={'$color5'}
            fontSize={'$2'}
            fontWeight='600'
            icon={<CustomIcon name={'location'} size='$1' color='$color5' />}
        >
            {category.name}
        </Button>
    )
}