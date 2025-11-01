import { useBoolean } from "@/hooks/primitive/use-boolean";
import React from "react";
import { Text, TouchableOpacity, View } from 'react-native';

const ShowReadMore = ({ desc }: { desc: string }) => {
    const isExpanded = useBoolean(false);
    const MAX_DISPLAY_LINES = 3;

    const maxDisplayLine = isExpanded.value ? desc.split('\n').length : MAX_DISPLAY_LINES;
    const displayLines = desc.split('\n').filter((_, i) => i < 3);

    return (
        <View style={{ marginHorizontal: 12, marginBottom: 12 }}>
            <Text
                numberOfLines={maxDisplayLine}
                style={{ fontSize: 16, lineHeight: 22 }}
            >
                {desc}
            </Text>

            {isExpanded.value && (
                <TouchableOpacity onPress={isExpanded.onToggle}>
                    <Text style={{ color: '#007bff', marginTop: 6 }}>
                        {isExpanded ? 'Show Less' : 'Read More'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};
export default ShowReadMore