import React from "react";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
  FormError,
} from "@/components/ui/form";
export default function FormCard( { form, onSubmit, ispending, error, type } ) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="flex items-center space-x-2 text-sm font-medium">
                <User
                  className={`w-4 h-4 ${
                    errors.name ? "text-destructive" : "text-primary/70"
                  }`}
                />
                <span>Username</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Username"
                  {...field}
                  disabled={ispending}
                  type="text"
                  className="bg-background/50 border-muted-foreground/20 focus:border-primary transition-colors"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="flex items-center space-x-2 text-sm font-medium">
                  <Mail
                    className={`w-4 h-4 ${
                      errors.email ? "text-destructive" : "text-primary/70"
                    }`}
                  />
                  <span>Email</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="your@email.com"
                    {...field}
                    type="email"
                    disabled={ispending}
                    className="bg-background/50 border-muted-foreground/20 focus:border-primary transition-colors"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="flex items-center space-x-2 text-sm font-medium">
                  <Lock
                    className={`w-4 h-4 ${
                      errors.password ? "text-destructive" : "text-primary/70"
                    }`}
                  />
                  <span>Password</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="••••••••"
                      {...field}
                      disabled={ispending}
                      type={showPassword ? "text" : "password"}
                      className="bg-background/50 border-muted-foreground/20 focus:border-primary transition-colors pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="flex items-center space-x-2 text-sm font-medium">
                <UserRoundCogIcon
                  className={`w-4 h-4 ${
                    errors.role ? "text-destructive" : "text-primary/70"
                  }`}
                />
                <span>Role</span>
              </FormLabel>
              <Select
                required
                onValueChange={(value) => field.onChange(value)}
                value={field.value}
                disabled={ispending}
              >
                <FormControl>
                  <SelectTrigger className="bg-background/50 border-muted-foreground/20 focus:border-primary transition-colors">
                    <SelectValue placeholder="Select your Role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="owner">Gym Owner</SelectItem>
                  <SelectItem value="trainer">Trainer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        {type && (
          <FormError
            FormErrorProps={{
              message: error,
              type: type,
            }}
          />
        )}

        <Button
          className="w-full font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300 shadow-lg"
          type="submit"
          disabled={ispending}
          size="lg"
        >
          {ispending ? (
            <div className="flex items-center space-x-2">
              <span className="animate-spin">⚪</span>
              <span>Registering...</span>
            </div>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </Form>
  );
}
