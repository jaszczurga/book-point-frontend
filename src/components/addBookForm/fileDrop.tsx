import React from 'react';
import { Control, Controller } from 'react-hook-form';
import Dropzone from 'react-dropzone';
import {IAddBookFormSchema} from "@/components/addBookForm/zod";


type Props = {
    control: Control<IAddBookFormSchema, any>;
    name: any;
}

export const FileDrop: React.FC<Props> = ({ control, name }) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value } }) => (
                <Dropzone
                    onDrop={(acceptedFiles) => {
                        if (acceptedFiles.length > 0) {
                            onChange(acceptedFiles[0]);
                        }
                    }}
                    accept={{ 'image/*': [] }}
                    multiple={false}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div
                            {...getRootProps()}
                            className="border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition duration-300"
                        >
                            <input {...getInputProps()} onBlur={onBlur} />
                            <p className="text-gray-500">Drag and drop an image here, or click to select one</p>

                            {value && (
                                <div className="mt-4 text-center">
                                    <img
                                        src={URL.createObjectURL(value)}
                                        alt="Selected file"
                                        className="max-w-full max-h-52 rounded-lg shadow-md"
                                    />
                                    <p className="mt-2 text-sm text-gray-700">{value.name}</p>
                                </div>
                            )}
                        </div>
                    )}
                </Dropzone>
            )}
        />
    );
};
