export function LogRequest(message: string): MethodDecorator {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(`🚀 Route called: ${String(propertyKey)} | ${message}`);
      return original.apply(this, args);
    };
    return descriptor;
  };
}

export const LogRequest2 = (message: string): MethodDecorator => {
  console.log(`📦 DECORATOR FACTORY EVALUATED with message: ${message}`); // this runs at decorator creation

  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    console.log(`🔥 DECORATOR APPLIED on: ${String(propertyKey)} | ${message}`);
    return descriptor;
  };
};
