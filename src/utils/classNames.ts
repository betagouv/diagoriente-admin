export default function (
  ...args: (string | false | null | undefined)[]
): string {
  return args.filter(row => row).join(' ');
}
