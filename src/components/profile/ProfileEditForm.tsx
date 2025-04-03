import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .optional(),
  avatar_url: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .max(500, { message: "Bio must be less than 500 characters" })
    .optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProfileEditFormProps {
  onSuccess?: () => void;
}

const ProfileEditForm = ({ onSuccess }: ProfileEditFormProps) => {
  const { user, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.user_metadata?.name || "",
      email: user?.email || "",
      avatar_url: user?.user_metadata?.avatar_url || "",
      bio: user?.user_metadata?.bio || "",
      phone: user?.user_metadata?.phone || "",
      company: user?.user_metadata?.company || "",
      position: user?.user_metadata?.position || "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const { error } = await updateProfile({
        name: values.name,
        avatar_url: values.avatar_url || undefined,
        ...values,
      });

      if (error) {
        setError(error.message || "Failed to update profile");
      } else {
        setSuccess("Profile updated successfully");
        if (onSuccess) onSuccess();
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {success && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">
            {success}
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={form.watch("avatar_url") || undefined}
            alt="Profile"
          />
          <AvatarFallback className="text-2xl">
            {form.watch("name")?.charAt(0) || user?.email?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-medium">
            {form.watch("name") || "Your Name"}
          </h3>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} disabled />
                </FormControl>
                <FormDescription>
                  Email cannot be changed. This is your login identifier.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="avatar_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Picture URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/avatar.jpg"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter a URL for your profile picture
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little about yourself"
                    className="min-h-32"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Brief description about yourself (max 500 characters)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 000-0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Your position" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileEditForm;
