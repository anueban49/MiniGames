"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { Form } from "react-hook-form";

//current code structure: each field input has a same component, but how do I add this configuariton of password and confirmpassword
import {
  Form,
  useFormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";
const MAX_UPLOAD_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg, image/jpg, image/png, image/webp"];

const ImageSchema = z
  .instanceof(File, { message: "Please upload your profile image" })
  .refine((file) => file.size <= MAX_UPLOAD_SIZE, `Max size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    `jps, jpeg, png, webp are accepted.`
  );

const formSchema = z
  .object({
    firstName: z
      .string()
      .nonempty("field must not be empty")
      .min(2, "length must be more than 2 character")
      .max(50),
    lastName: z.string().min(2).max(50),
    email: z.email("Invalid email address"),
    username: z.string().min(5).max(10),
    DoB: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    image: ImageSchema,
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),

    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
    phoneNumber: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

function FillboxReusable({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label} 
            <span className="text-red-500">*</span>
            </FormLabel>
          <FormControl>
            {type === "file" ? (
              <label className="flex flex-col items-center justify-center border-dashed border-2 border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500">
                {field.value ? (
                  <img
                    src={URL.createObjectURL(field.value)}
                    alt="Preview"
                    className=" object-cover "
                  />
                ) : (
                  <span className="text-gray-500">
                    {placeholder || "Upload image"}
                  </span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </label>
            ) : (
              <Input type={type} placeholder={placeholder} {...field} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default function FormPage() {
  const [step, setStep] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Validate as user types
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      DoB: "",
      password: "",
      confirmPassword: "",
      image: undefined,
      phoneNumber: "",
    },
  });

  const stepFields = {
    1: [
      {
        name: "firstName",
        label: "First Name",
        placeholder: "John",
        type: "text",
      },
      {
        name: "lastName",
        label: "Last Name",
        placeholder: "Doe",
        type: "text",
      },
      {
        name: "username",
        label: "Username",
        placeholder: "johndoe123",
        type: "text",
      },
    ],
    2: [
      {
        name: "email",
        label: "Email",
        placeholder: "john@example.com",
        type: "email",
      },
      {
        name: "phoneNumber",
        label: "Phone Number",
        placeholder: "12345678",
        type: "text",
      },
      {
        name: "password",
        label: "Password",
        placeholder: "••••••••",
        type: "password",
      },
      {
        name: "confirmPassword",
        label: "Confirm Password",
        placeholder: "••••••••",
        type: "password",
      },
    ],
    3: [
      {
        name: "DoB",
        label: "Date of Birth",
        placeholder: "",
        type: "date",
      },
      {
        name: "image",
        label: "Profile Image URL",
        placeholder: "",
        type: "file",
      },
    ],
  };

  async function handleNext() {
    // Validate only current step fields
    const fieldsToValidate = stepFields[step as keyof typeof stepFields].map(
      (f) => f.name
    );
    const isValid = await form.trigger(fieldsToValidate as any);

    if (isValid) {
      setStep(step + 1);
    }
  }

  function handleBack() {
    setStep(step - 1);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted:", values);
  }

  const currentFields = stepFields[step as keyof typeof stepFields];
  const totalSteps = Object.keys(stepFields).length;

  return (
    <div className="w-full h-screen flex flex-row justify-center items-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="">
            <img src="/misc/Main 1.svg" alt="Logo" className="mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Join Us!</h1>
            <p className="text-sm text-gray-600 mt-2">
              Please provide current information accurately
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {currentFields.map((field) => (
                <FillboxReusable
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  type={field.type}
                />
              ))}

              <div className="flex gap-2 pt-4">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1"
                  >
                    Back
                  </Button>
                )}

                {step < totalSteps ? (
                  <Button type="button" onClick={handleNext} className="flex-1">
                    Continue {step}/{totalSteps}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex-1"
                    onSubmit={form.handleSubmit}
                  >
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
