export type AssignedSerial = {
  serial: string;
  technician: string;
  category: string;
  model: string;
  assignedAt: string;
};

const SN_ASSIGNMENTS: AssignedSerial[] = [];

export function assignSerial(
  serial: string,
  technician: string,
  category: string,
  model: string
): boolean {
  const normalizedSerial = serial.trim().toUpperCase();
  const existing = SN_ASSIGNMENTS.find((item) => item.serial === normalizedSerial);

  if (existing) {
    return existing.technician === technician;
  }

  SN_ASSIGNMENTS.push({
    serial: normalizedSerial,
    technician,
    category,
    model,
    assignedAt: new Date().toISOString(),
  });

  return true;
}

export function isSerialAssignedToTechnician(
  serial: string,
  technician: string
): boolean {
  const normalizedSerial = serial.trim().toUpperCase();
  return SN_ASSIGNMENTS.some(
    (item) => item.serial === normalizedSerial && item.technician === technician
  );
}

export function getAssignmentsByCategory(category: string): AssignedSerial[] {
  return SN_ASSIGNMENTS.filter((item) => item.category === category);
}

export function getAssignmentsByTechnician(technician: string): AssignedSerial[] {
  return SN_ASSIGNMENTS.filter((item) => item.technician === technician);
}

export function findAssignmentBySerial(serial: string): AssignedSerial | undefined {
  return SN_ASSIGNMENTS.find((item) => item.serial === serial.trim().toUpperCase());
}
